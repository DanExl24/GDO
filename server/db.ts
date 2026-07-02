import { Pool, PoolClient } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err: Error) => {
  console.error('❌ Error inesperado en el pool de PostgreSQL:', err);
});

/**
 * Intenta obtener una conexión del pool con reintentos automáticos.
 * Útil para manejar fallos DNS intermitentes de Render.
 */
export async function connectWithRetry(maxRetries = 3, delayMs = 800): Promise<PoolClient> {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await pool.connect();
    } catch (err) {
      lastError = err as Error;
      console.warn(`⚠️ Intento ${attempt}/${maxRetries} de conexión a PostgreSQL falló: ${(err as Error).message}`);
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}

export default pool;
