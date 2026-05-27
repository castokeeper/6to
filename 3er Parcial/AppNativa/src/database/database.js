import * as SQLite from 'expo-sqlite';

let db = null;

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('techconnect.db');
    await initializeDatabase();
  }
  return db;
};

const initializeDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT '👤',
      bio TEXT DEFAULT 'Nuevo en TechConnect',
      tema_oscuro INTEGER DEFAULT 1,
      notificaciones INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now','localtime'))
    );

    CREATE TABLE IF NOT EXISTS publicaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      contenido TEXT NOT NULL,
      categoria TEXT DEFAULT 'General',
      likes INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now','localtime')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS favoritos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      publicacion_id INTEGER NOT NULL,
      created_at TEXT DEFAULT (datetime('now','localtime')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE,
      UNIQUE(usuario_id, publicacion_id)
    );
  `);
};

export const registrarUsuario = async (nombre, email, password) => {
  const nombreSanitizado = String(nombre || '').trim();
  const emailSanitizado = String(email || '').trim().toLowerCase();
  const passwordStr = String(password || '');

  const database = await getDatabase();
  const resultado = await database.runAsync(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombreSanitizado, emailSanitizado, passwordStr]
  );
  return resultado.lastInsertRowId;
};

export const iniciarSesion = async (email, password) => {
  const emailSanitizado = String(email || '').trim().toLowerCase();
  const passwordStr = String(password || '');

  const database = await getDatabase();
  const usuario = await database.getFirstAsync(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [emailSanitizado, passwordStr]
  );
  return usuario;
};

export const obtenerUsuario = async (id) => {
  const idNum = Number(id);
  if (isNaN(idNum)) return null;

  const database = await getDatabase();
  const usuario = await database.getFirstAsync(
    'SELECT * FROM usuarios WHERE id = ?',
    [idNum]
  );
  return usuario;
};

export const actualizarPerfil = async (id, nombre, bio, avatar) => {
  const idNum = Number(id);
  if (isNaN(idNum)) return;

  const nombreSanitizado = String(nombre || '').trim();
  const bioSanitizado = String(bio || '').trim();
  const avatarSanitizado = String(avatar || '👤').trim();

  const database = await getDatabase();
  await database.runAsync(
    'UPDATE usuarios SET nombre = ?, bio = ?, avatar = ? WHERE id = ?',
    [nombreSanitizado, bioSanitizado, avatarSanitizado, idNum]
  );
};

export const actualizarPreferencias = async (id, temaOscuro, notificaciones) => {
  const idNum = Number(id);
  if (isNaN(idNum)) return;

  const temaOscuroVal = temaOscuro ? 1 : 0;
  const notificacionesVal = notificaciones ? 1 : 0;

  const database = await getDatabase();
  await database.runAsync(
    'UPDATE usuarios SET tema_oscuro = ?, notificaciones = ? WHERE id = ?',
    [temaOscuroVal, notificacionesVal, idNum]
  );
};

export const eliminarCuenta = async (id) => {
  const idNum = Number(id);
  if (isNaN(idNum)) return;

  const database = await getDatabase();
  await database.runAsync('DELETE FROM favoritos WHERE usuario_id = ?', [idNum]);
  await database.runAsync('DELETE FROM publicaciones WHERE usuario_id = ?', [idNum]);
  await database.runAsync('DELETE FROM usuarios WHERE id = ?', [idNum]);
};

export const crearPublicacion = async (usuarioId, contenido, categoria) => {
  const usuarioIdNum = Number(usuarioId);
  if (isNaN(usuarioIdNum)) throw new Error('ID de usuario inválido');

  const contenidoSanitizado = String(contenido || '').trim();
  
  const CATEGORIAS_VALIDAS = ['General', 'Desarrollo', 'Tips', 'Herramientas', 'Noticias', 'Comunidad'];
  const categoriaSanitizada = CATEGORIAS_VALIDAS.includes(categoria) ? categoria : 'General';

  const database = await getDatabase();
  const resultado = await database.runAsync(
    'INSERT INTO publicaciones (usuario_id, contenido, categoria) VALUES (?, ?, ?)',
    [usuarioIdNum, contenidoSanitizado, categoriaSanitizada]
  );
  return resultado.lastInsertRowId;
};

export const obtenerPublicaciones = async () => {
  const database = await getDatabase();
  const publicaciones = await database.getAllAsync(`
    SELECT p.*, u.nombre AS autor_nombre, u.avatar AS autor_avatar
    FROM publicaciones p
    JOIN usuarios u ON p.usuario_id = u.id
    ORDER BY p.created_at DESC
  `);
  return publicaciones;
};

export const obtenerPublicacionesUsuario = async (usuarioId) => {
  const usuarioIdNum = Number(usuarioId);
  if (isNaN(usuarioIdNum)) return [];

  const database = await getDatabase();
  const publicaciones = await database.getAllAsync(`
    SELECT p.*, u.nombre AS autor_nombre, u.avatar AS autor_avatar
    FROM publicaciones p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE p.usuario_id = ?
    ORDER BY p.created_at DESC
  `, [usuarioIdNum]);
  return publicaciones;
};

export const darLike = async (publicacionId) => {
  const publicacionIdNum = Number(publicacionId);
  if (isNaN(publicacionIdNum)) return;

  const database = await getDatabase();
  await database.runAsync(
    'UPDATE publicaciones SET likes = likes + 1 WHERE id = ?',
    [publicacionIdNum]
  );
};

export const eliminarPublicacion = async (publicacionId) => {
  const publicacionIdNum = Number(publicacionId);
  if (isNaN(publicacionIdNum)) return;

  const database = await getDatabase();
  await database.runAsync('DELETE FROM favoritos WHERE publicacion_id = ?', [publicacionIdNum]);
  await database.runAsync('DELETE FROM publicaciones WHERE id = ?', [publicacionIdNum]);
};

export const agregarFavorito = async (usuarioId, publicacionId) => {
  const usuarioIdNum = Number(usuarioId);
  const publicacionIdNum = Number(publicacionId);
  if (isNaN(usuarioIdNum) || isNaN(publicacionIdNum)) return false;

  const database = await getDatabase();
  try {
    await database.runAsync(
      'INSERT INTO favoritos (usuario_id, publicacion_id) VALUES (?, ?)',
      [usuarioIdNum, publicacionIdNum]
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const eliminarFavorito = async (usuarioId, publicacionId) => {
  const usuarioIdNum = Number(usuarioId);
  const publicacionIdNum = Number(publicacionId);
  if (isNaN(usuarioIdNum) || isNaN(publicacionIdNum)) return;

  const database = await getDatabase();
  await database.runAsync(
    'DELETE FROM favoritos WHERE usuario_id = ? AND publicacion_id = ?',
    [usuarioIdNum, publicacionIdNum]
  );
};

export const esFavorito = async (usuarioId, publicacionId) => {
  const usuarioIdNum = Number(usuarioId);
  const publicacionIdNum = Number(publicacionId);
  if (isNaN(usuarioIdNum) || isNaN(publicacionIdNum)) return false;

  const database = await getDatabase();
  const resultado = await database.getFirstAsync(
    'SELECT id FROM favoritos WHERE usuario_id = ? AND publicacion_id = ?',
    [usuarioIdNum, publicacionIdNum]
  );
  return resultado !== null;
};

export const obtenerFavoritos = async (usuarioId) => {
  const usuarioIdNum = Number(usuarioId);
  if (isNaN(usuarioIdNum)) return [];

  const database = await getDatabase();
  const favoritos = await database.getAllAsync(`
    SELECT p.*, u.nombre AS autor_nombre, u.avatar AS autor_avatar
    FROM favoritos f
    JOIN publicaciones p ON f.publicacion_id = p.id
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE f.usuario_id = ?
    ORDER BY f.created_at DESC
  `, [usuarioIdNum]);
  return favoritos;
};

export const insertarDatosEjemplo = async (usuarioId) => {
  const usuarioIdNum = Number(usuarioId);
  if (isNaN(usuarioIdNum)) return;

  const database = await getDatabase();
  
  const existentes = await database.getFirstAsync(
    'SELECT COUNT(*) as total FROM publicaciones WHERE usuario_id != ?',
    [usuarioIdNum]
  );
  
  if (existentes && existentes.total > 0) return;

  const avatares = ['🧑‍💻', '👩‍💻', '🤖', '🎮', '🚀'];
  const nombres = ['Ana García', 'Carlos Dev', 'María Tech', 'Luis Code', 'Sofía Byte'];
  const bios = [
    'Full-stack developer apasionada',
    'Desarrollador mobile & gamer',
    'Ingeniera de datos e IA',
    'Backend developer & DevOps',
    'UX/UI Designer & frontend dev'
  ];

  const userIds = [];
  for (let i = 0; i < nombres.length; i++) {
    try {
      const res = await database.runAsync(
        'INSERT INTO usuarios (nombre, email, password, avatar, bio) VALUES (?, ?, ?, ?, ?)',
        [nombres[i], `user${i}@tech.com`, '1234', avatares[i], bios[i]]
      );
      userIds.push(res.lastInsertRowId);
    } catch (e) {
    }
  }

  const publicacionesEjemplo = [
    { contenido: '¡Acabo de terminar mi primer proyecto en React Native! 🎉 La experiencia ha sido increíble, Expo hace todo mucho más fácil.', categoria: 'Desarrollo' },
    { contenido: '¿Alguien ha probado las nuevas funciones de IA en VS Code? El autocompletado es impresionante. 🤯', categoria: 'Herramientas' },
    { contenido: 'Tip del día: Usen SQLite para persistencia local en apps móviles. Es rápido, ligero y no necesita servidor. 💡', categoria: 'Tips' },
    { contenido: 'Buscando equipo para hackathon de este fin de semana. ¿Quién se apunta? 🏆', categoria: 'Comunidad' },
    { contenido: 'La nueva versión de TypeScript 6.0 trae cambios enormes. Pattern matching nativo y mejor inferencia de tipos. 🔥', categoria: 'Noticias' },
    { contenido: 'Comparto mi setup de desarrollo: MacBook Pro M4, monitor ultrawide, teclado mecánico personalizado. ¿Cuál es el suyo? ⌨️', categoria: 'General' },
    { contenido: 'Migré toda la base de datos de mi proyecto a PostgreSQL y la diferencia en rendimiento es notable. 📊', categoria: 'Desarrollo' },
    { contenido: '¡Nuevo tutorial disponible! Cómo crear animaciones fluidas en React Native con Reanimated. Link en mi perfil. 📱', categoria: 'Tips' },
  ];

  const allUserIds = [...userIds];
  if (allUserIds.length === 0) return;

  for (const pub of publicacionesEjemplo) {
    const randomUserId = allUserIds[Math.floor(Math.random() * allUserIds.length)];
    try {
      await database.runAsync(
        'INSERT INTO publicaciones (usuario_id, contenido, categoria, likes) VALUES (?, ?, ?, ?)',
        [randomUserId, pub.contenido, pub.categoria, Math.floor(Math.random() * 50)]
      );
    } catch (e) {
    }
  }
};
