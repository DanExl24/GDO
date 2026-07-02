import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import usuariosRouter from './routes/usuarios';
import syncRouter from './routes/sync';
import pool from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Auth endpoint sencillo
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { tipo, documento, password } = req.body;

  if (tipo === 'admin') {
    const adminUser = process.env.ADMIN_USER || 'admin';
    const adminPass = process.env.ADMIN_PASS || 'admin123';

    if (documento === adminUser && password === adminPass) {
      res.json({
        success: true,
        role: 'admin',
        message: 'Bienvenido, Administrador',
      });
      return;
    }
    res.status(401).json({ error: 'Credenciales de administrador incorrectas' });
    return;
  }

  // Login de usuario normal por documento
  if (tipo === 'user') {
    const pool = require('./db').default;
    pool.query(
      'SELECT id, documento, nombre, apellido, password FROM usuario WHERE documento = $1',
      [documento]
    ).then((result: { rows: unknown[] }) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: 'No se encontró un usuario con ese documento' });
        return;
      }
      
      const dbUser = result.rows[0] as { id: number; documento: string; nombre: string; apellido: string; password?: string };
      
      // Si el usuario tiene contraseña definida en la base de datos, validarla
      if (dbUser.password && dbUser.password.trim() !== '') {
        if (dbUser.password !== password) {
          res.status(401).json({ error: 'Contraseña de usuario incorrecta' });
          return;
        }
      }

      // No devolver el hash/password en la respuesta por seguridad
      const { password: _, ...userWithoutPassword } = dbUser;

      res.json({
        success: true,
        role: 'user',
        usuario: userWithoutPassword,
        message: `Bienvenido, ${dbUser.nombre}`,
      });
    }).catch((error: Error) => {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno' });
    });
    return;
  }

  res.status(400).json({ error: 'Tipo de login no válido' });
});

// Routes
app.use('/api/usuarios', usuariosRouter);
app.use('/api/sync', syncRouter);

// Health check
app.get('/api/health', async (_req: Request, res: Response) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected', timestamp: new Date().toISOString() });
  } catch (error) {
    console.warn('⚠️ Health check: Error consultando base de datos:', (error as Error).message);
    res.json({ status: 'ok', database: 'disconnected', timestamp: new Date().toISOString() });
  }
});

// Start
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});

export default app;
