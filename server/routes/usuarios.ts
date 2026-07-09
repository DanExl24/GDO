import { Router, Request, Response } from 'express';
import pool, { connectWithRetry } from '../db';

const router = Router();

// ============================================
// CRUD de Usuarios
// ============================================

// GET /api/usuarios — Listar todos
router.get('/', async (_req: Request, res: Response) => {
  try {
    const client = await connectWithRetry();
    try {
      const result = await client.query(
        'SELECT * FROM usuario ORDER BY id ASC'
      );
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error listando usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/usuarios/:id — Obtener uno con datos actuales
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await connectWithRetry();
    try {
      const usuario = await client.query(
        'SELECT * FROM usuario WHERE id = $1',
        [id]
      );

      if (usuario.rows.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Obtener datos actuales del historial
      const datos = await client.query(
        `SELECT campo, valor, version, fecha_creacion, origen
         FROM historial_usuario
         WHERE usuario_id = $1 AND es_actual = TRUE
         ORDER BY campo ASC`,
        [id]
      );

      res.json({
        ...usuario.rows[0],
        datos: datos.rows,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/usuarios — Crear usuario
router.post('/', async (req: Request, res: Response) => {
  try {
    const { documento, nombre, apellido, telefono, direccion, password } = req.body;

    if (!documento || !nombre || !apellido) {
      res.status(400).json({ error: 'Documento, nombre y apellido son obligatorios' });
      return;
    }

    if (String(documento).length > 10) {
      res.status(400).json({ error: 'El documento no puede exceder los 10 dígitos' });
      return;
    }

    // Verificar si ya existe
    const existing = await pool.query(
      'SELECT id FROM usuario WHERE documento = $1',
      [documento]
    );
    if (existing.rows.length > 0) {
      res.status(409).json({ error: 'Ya existe un usuario con ese documento' });
      return;
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const result = await client.query(
        'INSERT INTO usuario (documento, nombre, apellido, telefono, direccion, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [documento, nombre, apellido, telefono || '', direccion || '', password || '']
      );

      const userId = result.rows[0].id;
      const initialFields = { documento, nombre, apellido, telefono, direccion, password };

      // Registrar los campos iniciales en el historial
      for (const [field, value] of Object.entries(initialFields)) {
        if (value !== undefined && value !== null && String(value).trim() !== '') {
          await client.query(
            `INSERT INTO historial_usuario (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion)
             VALUES ($1, $2, $3, 1, TRUE, 'ONLINE', NOW())`,
            [userId, field, value]
          );
        }
      }

      await client.query('COMMIT');
      const io = req.app.get('io');
      if (io) io.emit('data-updated');
      res.status(201).json(result.rows[0]);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/usuarios/:id — Actualizar usuario (nombre/apellido base)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { documento, nombre, apellido, telefono, direccion, password } = req.body;

    if (documento && String(documento).length > 10) {
      res.status(400).json({ error: 'El documento no puede exceder los 10 dígitos' });
      return;
    }

    const client = await connectWithRetry();
    client.on('error', (err) => {
      console.warn('⚠️ Error inesperado asíncrono en el cliente de base de datos:', err.message);
    });
    try {
      await client.query('BEGIN');

      // Consultar el estado actual del usuario con bloqueo FOR UPDATE para serialización
      const existing = await client.query(
        'SELECT documento, nombre, apellido, telefono, direccion, password FROM usuario WHERE id = $1 FOR UPDATE',
        [id]
      );

      if (existing.rows.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        await client.query('ROLLBACK');
        return;
      }

      const oldUser = existing.rows[0];
      const newFields = { documento, nombre, apellido, telefono, direccion, password };

      // Actualizar la tabla de usuarios
      const result = await client.query(
        'UPDATE usuario SET documento = $1, nombre = $2, apellido = $3, telefono = $4, direccion = $5, password = $6 WHERE id = $7 RETURNING *',
        [documento, nombre, apellido, telefono || '', direccion || '', password || '', id]
      );

      // Comparar cambios y agregar versiones al historial
      const fieldsToTrack = ['documento', 'nombre', 'apellido', 'telefono', 'direccion', 'password'];
      for (const field of fieldsToTrack) {
        const oldValue = String(oldUser[field] || '').trim();
        const newValue = String(newFields[field as keyof typeof newFields] || '').trim();

        if (oldValue !== newValue) {
          // Verificar si ya existe este valor exacto en el historial del usuario (reutilización)
          const existingValueRecord = await client.query(
            `SELECT id, version, veces_reutilizado FROM historial_usuario
             WHERE usuario_id = $1 AND campo = $2 AND TRIM(LOWER(valor)) = TRIM(LOWER($3))`,
            [id, field, newValue]
          );

          if (existingValueRecord.rows.length > 0) {
            // REUTILIZAR REGISTRO HISTÓRICO
            const histId = existingValueRecord.rows[0].id;

            // 1. Marcar el actual como no vigente de manera masiva
            await client.query(
              'UPDATE historial_usuario SET es_actual = FALSE WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE',
              [id, field]
            );

            // 2. Reactivar el anterior
            await client.query(
              `UPDATE historial_usuario 
               SET es_actual = TRUE, fecha_ultima_activacion = NOW(), veces_reutilizado = COALESCE(veces_reutilizado, 0) + 1, fecha_sincronizacion = NOW()
               WHERE id = $1`,
              [histId]
            );
          } else {
            // CREAR NUEVA VERSIÓN
            // Obtener versión máxima del campo en todo el historial
            const maxVersionRes = await client.query(
              `SELECT COALESCE(MAX(version), 0) as max_version FROM historial_usuario
               WHERE usuario_id = $1 AND campo = $2`,
              [id, field]
            );
            
            const newVersion = parseInt(maxVersionRes.rows[0].max_version, 10) + 1;

            // Marcar todos los registros anteriores como no actuales
            await client.query(
              'UPDATE historial_usuario SET es_actual = FALSE WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE',
              [id, field]
            );

            // Insertar nueva versión
            await client.query(
              `INSERT INTO historial_usuario (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion, fecha_sincronizacion)
               VALUES ($1, $2, $3, $4, TRUE, 'ONLINE', NOW(), NOW())`,
              [id, field, newValue, newVersion]
            );
          }
        }
      }

      await client.query('COMMIT');
      const io = req.app.get('io');
      if (io) io.emit('data-updated');
      res.json(result.rows[0]);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/usuarios/:id — Eliminar usuario
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM usuario WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    const io = req.app.get('io');
    if (io) io.emit('data-updated');
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/usuarios/:id/historial — Historial completo
router.get('/:id/historial', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { campo } = req.query;

    let query = `
      SELECT * FROM historial_usuario
      WHERE usuario_id = $1
    `;
    const params: (string | number)[] = [Number(id)];

    if (campo) {
      query += ' AND campo = $2';
      params.push(String(campo));
    }

    query += ' ORDER BY campo ASC, version DESC';

    const client = await connectWithRetry();
    try {
      const result = await client.query(query, params);
      res.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error obteniendo historial:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/usuarios/:id/datos — Agregar/actualizar dato personal (modo online)
router.post('/:id/datos', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { campo, valor } = req.body;

    if (!campo || !valor) {
      res.status(400).json({ error: 'Campo y valor son obligatorios' });
      return;
    }

    const client = await connectWithRetry();
    client.on('error', (err) => {
      console.warn('⚠️ Error inesperado asíncrono en el cliente de base de datos:', err.message);
    });
    try {
      await client.query('BEGIN');

      // Bloquear la fila del usuario con FOR UPDATE para serializar escrituras concurrentes
      await client.query('SELECT id FROM usuario WHERE id = $1 FOR UPDATE', [id]);

      // Verificar si ya existe este valor exacto en el historial del usuario (reutilización - RN-05)
      const existingValueRecord = await client.query(
        `SELECT id, version, veces_reutilizado FROM historial_usuario
         WHERE usuario_id = $1 AND campo = $2 AND TRIM(LOWER(valor)) = TRIM(LOWER($3))`,
        [id, campo, valor]
      );

      let result;

      if (existingValueRecord.rows.length > 0) {
        // REUTILIZAR REGISTRO HISTÓRICO (RN-05 & RN-06)
        const histId = existingValueRecord.rows[0].id;
        
        // 1. Marcar el actual como no vigente de manera masiva
        await client.query(
          `UPDATE historial_usuario SET es_actual = FALSE 
           WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE`,
          [id, campo]
        );

        // 2. Reactivar el anterior actualizando veces_reutilizado y fecha_ultima_activacion
        result = await client.query(
          `UPDATE historial_usuario 
           SET es_actual = TRUE, fecha_ultima_activacion = NOW(), veces_reutilizado = COALESCE(veces_reutilizado, 0) + 1
           WHERE id = $1
           RETURNING *`,
          [histId]
        );
      } else {
        // CREAR NUEVO REGISTRO (RN-04)
        // Obtener versión actual
        const current = await client.query(
          `SELECT id, version FROM historial_usuario
           WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE`,
          [id, campo]
        );

        let newVersion = 1;

        if (current.rows.length > 0) {
          // Marcar todos los registros anteriores del campo como históricos de manera masiva
          await client.query(
            'UPDATE historial_usuario SET es_actual = FALSE WHERE usuario_id = $1 AND campo = $2 AND es_actual = TRUE',
            [id, campo]
          );
          newVersion = current.rows[0].version + 1;
        } else {
          // Si no hay historial pero sí hay un valor previo en las columnas del usuario, guardarlo como V1 no vigente
          const validColumns = ['documento', 'nombre', 'apellido', 'telefono', 'direccion', 'password'];
          if (validColumns.includes(campo)) {
            const userVal = await client.query(`SELECT ${campo} FROM usuario WHERE id = $1`, [id]);
            const existingValue = userVal.rows[0]?.[campo];
            if (existingValue !== undefined && existingValue !== null && String(existingValue).trim() !== '') {
              await client.query(
                `INSERT INTO historial_usuario (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion)
                 VALUES ($1, $2, $3, 1, FALSE, 'ONLINE', NOW())`,
                [id, campo, existingValue]
              );
              newVersion = 2;
            }
          }
        }

        // Insertar nuevo valor
        result = await client.query(
          `INSERT INTO historial_usuario (usuario_id, campo, valor, version, es_actual, origen, fecha_creacion)
           VALUES ($1, $2, $3, $4, TRUE, 'ONLINE', NOW())
           RETURNING *`,
          [id, campo, valor, newVersion]
        );
      }

      // Si el campo coincide con una columna de la tabla usuario, actualizarla dinámicamente
      const validColumns = ['documento', 'nombre', 'apellido', 'telefono', 'direccion', 'password'];
      if (validColumns.includes(campo)) {
        await client.query(`UPDATE usuario SET ${campo} = $1 WHERE id = $2`, [valor, id]);
      }

      await client.query('COMMIT');
      const io = req.app.get('io');
      if (io) io.emit('data-updated');
      res.status(201).json(result.rows[0]);
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error guardando dato:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
