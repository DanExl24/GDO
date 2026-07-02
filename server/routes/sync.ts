import { Router, Request, Response } from 'express';
import pool, { connectWithRetry } from '../db';

const router = Router();

interface PendingChange {
  usuario_id: number;
  campo: string;
  valor: string;
  fecha_creacion: string;
}

// POST /api/sync — Sincronizar cambios pendientes desde SQLite
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cambios } = req.body as { cambios: PendingChange[] };

    if (!cambios || !Array.isArray(cambios) || cambios.length === 0) {
      res.status(400).json({ error: 'No hay cambios para sincronizar' });
      return;
    }

    const client = await connectWithRetry();
    const results: { success: boolean; campo: string; usuario_id: number; version: number }[] = [];

    try {
      await client.query('BEGIN');

      for (const cambio of cambios) {
        const { usuario_id, campo, valor, fecha_creacion } = cambio;

        // Verificar que el usuario existe
        const userExists = await client.query(
          'SELECT id FROM usuario WHERE id = $1',
          [usuario_id]
        );

        if (userExists.rows.length === 0) {
          results.push({
            success: false,
            campo,
            usuario_id,
            version: 0,
          });
          continue;
        }

        // Verificar si ya existe este valor exacto en el historial del usuario (reutilización - RN-05)
        const existingValueRecord = await client.query(
          `SELECT id, version, veces_reutilizado FROM historial_usuario
           WHERE usuario_id = $1 AND campo = $2 AND TRIM(LOWER(valor)) = TRIM(LOWER($3))`,
          [usuario_id, campo, valor]
        );

        let finalVersion = 1;

        if (existingValueRecord.rows.length > 0) {
          // REUTILIZAR REGISTRO HISTÓRICO (RN-05 & RN-06)
          const histId = existingValueRecord.rows[0].id;
          finalVersion = existingValueRecord.rows[0].version;

          // 1. Marcar el actual como no vigente
          await client.query(
            `UPDATE historial_usuario SET es_actual = FALSE 
             WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE`,
            [usuario_id, campo]
          );

          // 2. Reactivar el anterior actualizando veces_reutilizado y fecha_ultima_activacion
          await client.query(
            `UPDATE historial_usuario 
             SET es_actual = TRUE, fecha_ultima_activacion = NOW(), veces_reutilizado = COALESCE(veces_reutilizado, 0) + 1, fecha_sincronizacion = NOW()
             WHERE id = $1`,
            [histId]
          );
        } else {
          // CREAR NUEVO REGISTRO (RN-04)
          // Obtener versión actual del campo
          const current = await client.query(
            `SELECT id, version FROM historial_usuario
             WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE`,
            [usuario_id, campo]
          );

          let newVersion = 1;

          if (current.rows.length > 0) {
            // Marcar registro actual como histórico
            await client.query(
              'UPDATE historial_usuario SET es_actual = FALSE WHERE id = $1',
              [current.rows[0].id]
            );
            newVersion = current.rows[0].version + 1;
          } else {
            // Si no hay historial pero sí hay un valor previo en las columnas del usuario, guardarlo como V1 no vigente
            const validColumns = ['documento', 'nombre', 'apellido', 'telefono', 'direccion', 'password'];
            if (validColumns.includes(campo)) {
              const userVal = await client.query(`SELECT ${campo} FROM usuario WHERE id = $1`, [usuario_id]);
              const existingValue = userVal.rows[0]?.[campo];
              if (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '') {
                await client.query(
                  `INSERT INTO historial_usuario (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion, fecha_sincronizacion)
                   VALUES ($1, $2, $3, 1, FALSE, 'ONLINE', NOW(), NOW())`,
                  [usuario_id, campo, existingValue]
                );
                newVersion = 2;
              }
            }
          }

          finalVersion = newVersion;

          // Insertar nuevo registro como actual
          await client.query(
            `INSERT INTO historial_usuario
             (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion, fecha_sincronizacion)
             VALUES ($1, $2, $3, $4, TRUE, 'OFFLINE', $5, NOW())`,
            [usuario_id, campo, valor, newVersion, fecha_creacion]
          );
        }

        // Si el campo coincide con una columna de la tabla usuario, actualizarla dinámicamente
        const validColumns = ['documento', 'nombre', 'apellido', 'telefono', 'direccion', 'password'];
        if (validColumns.includes(campo)) {
          await client.query(`UPDATE usuario SET ${campo} = $1 WHERE id = $2`, [valor, usuario_id]);
        }

        results.push({
          success: true,
          campo,
          usuario_id,
          version: finalVersion,
        });
      }

      await client.query('COMMIT');

      res.json({
        message: `Sincronización completada: ${results.filter(r => r.success).length}/${cambios.length} cambios aplicados`,
        results,
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error en sincronización:', error);
    res.status(500).json({ error: 'Error durante la sincronización' });
  }
});

// GET /api/sync/pull/:usuario_id — Obtener todos los datos actuales para un usuario
router.get('/pull/:usuario_id', async (req: Request, res: Response) => {
  try {
    const { usuario_id } = req.params;

    const usuario = await pool.query(
      'SELECT * FROM usuario WHERE id = $1',
      [usuario_id]
    );

    if (usuario.rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    const datos = await pool.query(
      `SELECT campo, valor, version, es_actual, origen, fecha_creacion
       FROM historial_usuario
       WHERE usuario_id = $1 AND es_actual = TRUE
       ORDER BY campo ASC`,
      [usuario_id]
    );

    res.json({
      usuario: usuario.rows[0],
      datos: datos.rows,
    });
  } catch (error) {
    console.error('Error en pull:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

// GET /api/sync/pull-all — Obtener todos los usuarios y sus datos actuales
router.get('/pull-all', async (_req: Request, res: Response) => {
  try {
    const usuarios = await pool.query('SELECT * FROM usuario ORDER BY id ASC');

    const allData = [];
    for (const user of usuarios.rows) {
      const datos = await pool.query(
        `SELECT campo, valor, version, es_actual, origen, fecha_creacion
         FROM historial_usuario
         WHERE usuario_id = $1 AND es_actual = TRUE
         ORDER BY campo ASC`,
        [user.id]
      );
      allData.push({
        usuario: user,
        datos: datos.rows,
      });
    }

    res.json(allData);
  } catch (error) {
    console.error('Error en pull-all:', error);
    res.status(500).json({ error: 'Error obteniendo datos' });
  }
});

export default router;
