import * as SQLite from 'expo-sqlite';

let db = null;

/**
 * Obtiene la instancia de la base de datos SQLite.
 * Si no existe, la crea y ejecuta las migraciones.
 */
export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('techconnect.db');
    await initializeDatabase();
  }
  return db;
};

/**
 * Inicializa las tablas de la base de datos.
 */
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

// ==================== USUARIOS ====================

/**
 * Registra un nuevo usuario en la base de datos.
 */
export const registrarUsuario = async (nombre, email, password) => {
  const database = await getDatabase();
  const resultado = await database.runAsync(
    'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password]
  );
  return resultado.lastInsertRowId;
};

/**
 * Inicia sesión verificando email y contraseña.
 */
export const iniciarSesion = async (email, password) => {
  const database = await getDatabase();
  const usuario = await database.getFirstAsync(
    'SELECT * FROM usuarios WHERE email = ? AND password = ?',
    [email, password]
  );
  return usuario;
};

/**
 * Obtiene un usuario por su ID.
 */
export const obtenerUsuario = async (id) => {
  const database = await getDatabase();
  const usuario = await database.getFirstAsync(
    'SELECT * FROM usuarios WHERE id = ?',
    [id]
  );
  return usuario;
};

/**
 * Actualiza el perfil de un usuario.
 */
export const actualizarPerfil = async (id, nombre, bio, avatar) => {
  const database = await getDatabase();
  await database.runAsync(
    'UPDATE usuarios SET nombre = ?, bio = ?, avatar = ? WHERE id = ?',
    [nombre, bio, avatar, id]
  );
};

/**
 * Actualiza las preferencias del usuario.
 */
export const actualizarPreferencias = async (id, temaOscuro, notificaciones) => {
  const database = await getDatabase();
  await database.runAsync(
    'UPDATE usuarios SET tema_oscuro = ?, notificaciones = ? WHERE id = ?',
    [temaOscuro ? 1 : 0, notificaciones ? 1 : 0, id]
  );
};

/**
 * Elimina la cuenta de un usuario y todos sus datos.
 */
export const eliminarCuenta = async (id) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM favoritos WHERE usuario_id = ?', [id]);
  await database.runAsync('DELETE FROM publicaciones WHERE usuario_id = ?', [id]);
  await database.runAsync('DELETE FROM usuarios WHERE id = ?', [id]);
};

// ==================== PUBLICACIONES ====================

/**
 * Crea una nueva publicación.
 */
export const crearPublicacion = async (usuarioId, contenido, categoria) => {
  const database = await getDatabase();
  const resultado = await database.runAsync(
    'INSERT INTO publicaciones (usuario_id, contenido, categoria) VALUES (?, ?, ?)',
    [usuarioId, contenido, categoria]
  );
  return resultado.lastInsertRowId;
};

/**
 * Obtiene todas las publicaciones con info del autor.
 */
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

/**
 * Obtiene las publicaciones de un usuario específico.
 */
export const obtenerPublicacionesUsuario = async (usuarioId) => {
  const database = await getDatabase();
  const publicaciones = await database.getAllAsync(`
    SELECT p.*, u.nombre AS autor_nombre, u.avatar AS autor_avatar
    FROM publicaciones p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE p.usuario_id = ?
    ORDER BY p.created_at DESC
  `, [usuarioId]);
  return publicaciones;
};

/**
 * Da like a una publicación.
 */
export const darLike = async (publicacionId) => {
  const database = await getDatabase();
  await database.runAsync(
    'UPDATE publicaciones SET likes = likes + 1 WHERE id = ?',
    [publicacionId]
  );
};

/**
 * Elimina una publicación.
 */
export const eliminarPublicacion = async (publicacionId) => {
  const database = await getDatabase();
  await database.runAsync('DELETE FROM favoritos WHERE publicacion_id = ?', [publicacionId]);
  await database.runAsync('DELETE FROM publicaciones WHERE id = ?', [publicacionId]);
};

// ==================== FAVORITOS ====================

/**
 * Agrega una publicación a favoritos.
 */
export const agregarFavorito = async (usuarioId, publicacionId) => {
  const database = await getDatabase();
  try {
    await database.runAsync(
      'INSERT INTO favoritos (usuario_id, publicacion_id) VALUES (?, ?)',
      [usuarioId, publicacionId]
    );
    return true;
  } catch (error) {
    // Ya existe en favoritos
    return false;
  }
};

/**
 * Elimina una publicación de favoritos.
 */
export const eliminarFavorito = async (usuarioId, publicacionId) => {
  const database = await getDatabase();
  await database.runAsync(
    'DELETE FROM favoritos WHERE usuario_id = ? AND publicacion_id = ?',
    [usuarioId, publicacionId]
  );
};

/**
 * Verifica si una publicación está en favoritos.
 */
export const esFavorito = async (usuarioId, publicacionId) => {
  const database = await getDatabase();
  const resultado = await database.getFirstAsync(
    'SELECT id FROM favoritos WHERE usuario_id = ? AND publicacion_id = ?',
    [usuarioId, publicacionId]
  );
  return resultado !== null;
};

/**
 * Obtiene todas las publicaciones favoritas de un usuario.
 */
export const obtenerFavoritos = async (usuarioId) => {
  const database = await getDatabase();
  const favoritos = await database.getAllAsync(`
    SELECT p.*, u.nombre AS autor_nombre, u.avatar AS autor_avatar
    FROM favoritos f
    JOIN publicaciones p ON f.publicacion_id = p.id
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE f.usuario_id = ?
    ORDER BY f.created_at DESC
  `, [usuarioId]);
  return favoritos;
};

/**
 * Inserta datos de ejemplo para demostración.
 */
export const insertarDatosEjemplo = async (usuarioId) => {
  const database = await getDatabase();
  
  const existentes = await database.getFirstAsync(
    'SELECT COUNT(*) as total FROM publicaciones WHERE usuario_id != ?',
    [usuarioId]
  );
  
  if (existentes && existentes.total > 0) return;

  // Crear usuarios de ejemplo
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
      // Usuario ya existe
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
      // Ignorar errores
    }
  }
};
