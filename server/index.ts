import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import usuariosRouter from './routes/usuarios';
import syncRouter from './routes/sync';
import pool from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.set('io', io);

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
    res.json({ status: 'ok', database: 'disconnected', timestamp: new Date().toISOString() });
  }
});

// Gestión de WebSockets (Socket.io)
const activeSockets = new Map<string, { usuario_id: number; role: string; nombre: string }>();

io.on('connection', (socket) => {
  console.log(`🔌 Cliente WebSocket conectado: ${socket.id}`);

  // Enviar estado inmediato de la base de datos
  checkDbStatus().then((status) => {
    socket.emit('db-status', { database: status });
  });

  // Registro del usuario en el socket
  socket.on('register', (data: { usuario_id: number; role: string; nombre: string }) => {
    activeSockets.set(socket.id, data);
    console.log(`👤 Registro WebSocket: ${data.nombre} (${data.role})`);

    // Notificar a otros (especialmente administradores)
    socket.broadcast.emit('user-connected', {
      usuario_id: data.usuario_id,
      nombre: data.nombre,
      role: data.role,
    });

    if (data.role === 'admin') {
      sendActiveUsersList();
    }
  });

  // Escuchar estado de sincronización del cliente y reportar a los demás
  socket.on('sync-status', (data: { status: 'started' | 'completed' | 'error'; count?: number }) => {
    const userInfo = activeSockets.get(socket.id);
    if (userInfo) {
      if (data.status === 'started') {
        socket.broadcast.emit('sync-started', { usuario_id: userInfo.usuario_id, nombre: userInfo.nombre });
      } else if (data.status === 'completed') {
        socket.broadcast.emit('sync-completed', { usuario_id: userInfo.usuario_id, nombre: userInfo.nombre, count: data.count || 0 });
        // Emitir actualización de datos general para que los clientes se refresquen
        io.emit('data-updated');
      } else if (data.status === 'error') {
        socket.broadcast.emit('sync-error', { usuario_id: userInfo.usuario_id, nombre: userInfo.nombre });
      }
    }
  });

  // Desconexión
  socket.on('disconnect', () => {
    const userInfo = activeSockets.get(socket.id);
    if (userInfo) {
      console.log(`👤 Desconexión de registro: ${userInfo.nombre}`);
      socket.broadcast.emit('user-disconnected', {
        usuario_id: userInfo.usuario_id,
        nombre: userInfo.nombre,
        role: userInfo.role,
      });
      activeSockets.delete(socket.id);
      sendActiveUsersList();
    }
    console.log(`🔌 Cliente WebSocket desconectado: ${socket.id}`);
  });
});

function sendActiveUsersList() {
  const users = Array.from(activeSockets.values());
  io.emit('active-users', users);
}

// Chequeo de estado de base de datos interno del servidor
let lastDbStatus = 'connected';
async function checkDbStatus(): Promise<string> {
  try {
    await pool.query('SELECT 1');
    return 'connected';
  } catch (error) {
    return 'disconnected';
  }
}

// Sondeo interno del servidor cada 30 segundos
setInterval(async () => {
  const currentStatus = await checkDbStatus();
  if (currentStatus !== lastDbStatus) {
    lastDbStatus = currentStatus;
    io.emit('db-status', { database: currentStatus });
    console.log(`📡 Estado de Base de Datos PostgreSQL cambiado a: ${currentStatus}`);
  }
}, 30000);

// Start - Escuchar en 0.0.0.0 para aceptar conexiones del emulador Android (10.0.2.2)
server.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`\n🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
  console.log(`📡 API disponible en http://localhost:${PORT}/api`);
  console.log(`📱 Emulador Android: http://10.0.2.2:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});

export default server;
