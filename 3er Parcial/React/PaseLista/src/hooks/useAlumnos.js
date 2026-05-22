import { useState, useEffect, useCallback } from 'react';
import {
  obtenerAlumnos,
  insertarAlumno,
  actualizarEstado,
  eliminarAlumno,
} from '../db/database';

/** Nombres base para generar alumnos aleatorios. */
const NOMBRES = [
  'Alumno A', 'Alumno B', 'Alumno C', 'Alumno D',
  'Alumno E', 'Alumno F', 'Alumno G', 'Alumno H',
];

/**
 * Custom hook – lógica CRUD de alumnos con persistencia SQLite.
 */
export default function useAlumnos() {
  const [alumnos, setAlumnos] = useState([]);

  // Carga inicial desde SQLite
  useEffect(() => {
    (async () => {
      const rows = await obtenerAlumnos();
      setAlumnos(rows);
    })();
  }, []);

  // Registrar nuevo alumno
  const agregarAlumno = useCallback(async () => {
    const nombre =
      NOMBRES[alumnos.length % NOMBRES.length] +
      ' ' +
      Math.floor(Math.random() * 90 + 10);
    const nuevo = await insertarAlumno(nombre);
    setAlumnos((prev) => [...prev, nuevo]);
  }, [alumnos.length]);

  // Alternar Presente ↔ Ausente
  const toggleEstado = useCallback(async (id) => {
    setAlumnos((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nuevoEstado = a.presente ? 0 : 1;
          actualizarEstado(id, nuevoEstado);
          return { ...a, presente: nuevoEstado };
        }
        return a;
      })
    );
  }, []);

  // Eliminar alumno
  const eliminar = useCallback(async (id) => {
    await eliminarAlumno(id);
    setAlumnos((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const presentes = alumnos.filter((a) => a.presente).length;
  const ausentes = alumnos.filter((a) => !a.presente).length;

  return { alumnos, presentes, ausentes, agregarAlumno, toggleEstado, eliminar };
}
