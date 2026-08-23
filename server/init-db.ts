import pool, { connectWithRetry } from './db';

async function initDatabase() {
  const client = await connectWithRetry(5, 1500);

  try {
    console.log('🔄 Creando tablas en PostgreSQL...');

    // Tabla usuario
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        documento VARCHAR(50) UNIQUE NOT NULL,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        direccion VARCHAR(100),
        password VARCHAR(100)
      );
    `);

    // Migración por si la tabla ya existe
    await client.query(`
      ALTER TABLE usuario ADD COLUMN IF NOT EXISTS telefono VARCHAR(20);
      ALTER TABLE usuario ADD COLUMN IF NOT EXISTS direccion VARCHAR(100);
      ALTER TABLE usuario ADD COLUMN IF NOT EXISTS password VARCHAR(100);
      ALTER TABLE usuario ALTER COLUMN documento TYPE VARCHAR(50);
      ALTER TABLE usuario ALTER COLUMN nombre TYPE VARCHAR(100);
      ALTER TABLE usuario ALTER COLUMN apellido TYPE VARCHAR(100);
    `);
    console.log('✅ Tabla "usuario" creada/verificada y columnas adicionales migradas.');

    // Tabla historial_usuario
    await client.query(`
      CREATE TABLE IF NOT EXISTS historial_usuario (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
        campo VARCHAR(50) NOT NULL,
        valor TEXT NOT NULL,
        version INTEGER NOT NULL DEFAULT 1,
        es_actual BOOLEAN NOT NULL DEFAULT TRUE,
        origen VARCHAR(20) NOT NULL DEFAULT 'ONLINE',
        fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        fecha_sincronizacion TIMESTAMPTZ,
        fecha_ultima_activacion TIMESTAMPTZ,
        veces_reutilizado INTEGER DEFAULT 0
      );
    `);
    
    // Migración para columnas de reutilización si la tabla historial_usuario ya existía
    await client.query(`
      ALTER TABLE historial_usuario ADD COLUMN IF NOT EXISTS fecha_ultima_activacion TIMESTAMPTZ;
      ALTER TABLE historial_usuario ADD COLUMN IF NOT EXISTS veces_reutilizado INTEGER DEFAULT 0;
    `);
    console.log('✅ Tabla "historial_usuario" creada/verificada.');

    // Índice para búsqueda rápida de valor actual
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_historial_actual
      ON historial_usuario (usuario_id, campo, es_actual)
      WHERE es_actual = TRUE;
    `);

    // Índices únicos para evitar duplicados en valor y versión
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_history_value 
      ON historial_usuario (usuario_id, campo, LOWER(TRIM(valor)));
    `);

    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_history_version 
      ON historial_usuario (usuario_id, campo, version);
    `);
    console.log('✅ Índices creados/verificados.');

    console.log('\n🎉 Base de datos inicializada correctamente.');
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

initDatabase();
