import * as SQLite from 'expo-sqlite';

const NOMBRES_INICIALES = [
  'Ana',
  'Carlos',
  'Manzana',
  'Berlín',
  'Fernando',
  'Rosa',
  'Mango',
  'Diego',
  'Sofía',
  'Limón',
  'Alejandro',
  'Valentina',
  'Naranja',
  'Madrid',
  'Patricia',
];

let db = null;

/**
 * Inicializa la base de datos asíncronamente, asegura la existencia de la tabla
 * y realiza la población inicial de nombres si está vacía.
 */
async function openDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('directorio.db');
    
    // Crear la tabla si no existe
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS contactos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL);'
    );
    
    // Verificar si hay registros
    const countResult = await db.getFirstAsync('SELECT COUNT(*) as total FROM contactos;');
    if (countResult && countResult.total === 0) {
      // Poblar tabla de forma secuencial
      for (const nombre of NOMBRES_INICIALES) {
        await db.runAsync('INSERT INTO contactos (nombre) VALUES (?);', [nombre]);
      }
      console.log('Base de datos poblada con nombres iniciales.');
    }
  }
  return db;
}

/**
 * Obtiene contactos de la base de datos filtrados opcionalmente por nombre.
 * @param {string} textoBusqueda Término de búsqueda
 */
export async function obtenerContactos(textoBusqueda = '') {
  const database = await openDB();
  const queryText = textoBusqueda.trim();
  
  if (queryText === '') {
    return database.getAllAsync('SELECT * FROM contactos ORDER BY nombre ASC;');
  } else {
    return database.getAllAsync(
      'SELECT * FROM contactos WHERE nombre LIKE ? ORDER BY nombre ASC;',
      [`%${queryText}%`]
    );
  }
}

/**
 * Inserta un nuevo contacto en la base de datos.
 * @param {string} nombre Nombre del contacto
 */
export async function insertarContacto(nombre) {
  const database = await openDB();
  const result = await database.runAsync(
    'INSERT INTO contactos (nombre) VALUES (?);',
    [nombre.trim()]
  );
  return { id: result.lastInsertRowId, nombre: nombre.trim() };
}

/**
 * Elimina un contacto de la base de datos según su ID.
 * @param {number} id ID del contacto a eliminar
 */
export async function eliminarContacto(id) {
  const database = await openDB();
  await database.runAsync('DELETE FROM contactos WHERE id = ?;', [id]);
}
