import * as SQLite from 'expo-sqlite';

// ─── Singleton de la base de datos ──────────────────────────────────
let db = null;

/**
 * Abre (o reutiliza) la conexión a la base de datos y crea la tabla.
 * Usa la API async de expo-sqlite v16.
 */
async function openDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('paselista.db');
    await db.execAsync(
      'CREATE TABLE IF NOT EXISTS alumnos (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, presente INTEGER NOT NULL DEFAULT 0);'
    );
  }
  return db;
}

/** Obtiene todos los alumnos ordenados por ID. */
export async function obtenerAlumnos() {
  const database = await openDB();
  return database.getAllAsync('SELECT * FROM alumnos ORDER BY id ASC');
}

/** Inserta un nuevo alumno con estado "Falta" (presente = 0). */
export async function insertarAlumno(nombre) {
  const database = await openDB();
  const result = await database.runAsync(
    'INSERT INTO alumnos (nombre, presente) VALUES (?, 0)',
    [nombre]
  );
  return { id: result.lastInsertRowId, nombre, presente: 0 };
}

/** Actualiza el estado de asistencia de un alumno. */
export async function actualizarEstado(id, nuevoEstado) {
  const database = await openDB();
  await database.runAsync('UPDATE alumnos SET presente = ? WHERE id = ?', [
    nuevoEstado,
    id,
  ]);
}

/** Elimina un alumno permanentemente. */
export async function eliminarAlumno(id) {
  const database = await openDB();
  await database.runAsync('DELETE FROM alumnos WHERE id = ?', [id]);
}
