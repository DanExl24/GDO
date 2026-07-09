import pool from './db';

async function migrate() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    console.log('Iniciando migración de base de datos...');

    // 1. Limpiar duplicados exactos de valores (mantener el ID más reciente)
    console.log('Limpiando duplicados de valores...');
    await client.query(`
      DELETE FROM historial_usuario
      WHERE id NOT IN (
        SELECT MAX(id)
        FROM historial_usuario
        GROUP BY usuario_id, campo, LOWER(TRIM(valor))
      )
    `);

    // 2. Limpiar duplicados de versiones (por si quedaron versiones duplicadas con distintos valores)
    console.log('Limpiando duplicados de versiones...');
    await client.query(`
      DELETE FROM historial_usuario
      WHERE id NOT IN (
        SELECT MAX(id)
        FROM historial_usuario
        GROUP BY usuario_id, campo, version
      )
    `);

    // 3. Crear índices únicos
    console.log('Creando índice único para valores...');
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_history_value 
      ON historial_usuario (usuario_id, campo, LOWER(TRIM(valor)));
    `);

    console.log('Creando índice único para versiones...');
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_history_version 
      ON historial_usuario (usuario_id, campo, version);
    `);

    await client.query('COMMIT');
    console.log('✅ Migración completada exitosamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error durante la migración:', error);
  } finally {
    client.release();
    process.exit(0);
  }
}

migrate();
