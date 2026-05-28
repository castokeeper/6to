// ============================================================
// El Directorio Inteligente
// App.js — Componente principal (compatible con Expo Go SDK 54)
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// ─── Servicios de Base de Datos ──────────────────────────────
import {
  obtenerContactos,
  insertarContacto,
  eliminarContacto,
} from './src/db/database';

// ─── Componentes del Proyecto ───────────────────────────────
import Header from './src/components/Header';
import SearchBar from './src/components/SearchBar';
import AddContactForm from './src/components/AddContactForm';
import ContactItem from './src/components/ContactItem';
import EmptyState from './src/components/EmptyState';

export default function App() {
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [contactos, setContactos] = useState([]);

  // ── Cargar contactos de la base de datos ───────────────────
  const cargarContactos = useCallback(async (busqueda = '') => {
    try {
      const rows = await obtenerContactos(busqueda);
      setContactos(rows);
    } catch (error) {
      console.error('Error al cargar contactos de SQLite:', error);
    }
  }, []);

  // Cargar al inicio y cuando cambie la búsqueda
  useEffect(() => {
    cargarContactos(textoBusqueda);
  }, [textoBusqueda, cargarContactos]);

  // ── Agregar un contacto nuevo ──────────────────────────────
  const manejarAgregarContacto = async (nombre) => {
    try {
      await insertarContacto(nombre);
      // Recargar la lista manteniendo la búsqueda actual
      cargarContactos(textoBusqueda);
    } catch (error) {
      console.error('Error al insertar contacto:', error);
    }
  };

  // ── Eliminar un contacto ───────────────────────────────────
  const manejarEliminarContacto = async (id) => {
    try {
      await eliminarContacto(id);
      // Recargar la lista manteniendo la búsqueda actual
      cargarContactos(textoBusqueda);
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
    }
  };

  // ── Renderizado de cada item de la lista ─────────────────
  const renderItem = ({ item }) => (
    <ContactItem
      id={item.id}
      nombre={item.nombre}
      onRemove={manejarEliminarContacto}
    />
  );

  // ── Separador entre items ─────────────────────────────────
  const Separador = () => <View style={styles.separador} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4ff" />

      <View style={styles.contenedor}>
        {/* Encabezado */}
        <Header cantidadResultados={contactos.length} />

        {/* Buscador */}
        <SearchBar value={textoBusqueda} onChangeText={setTextoBusqueda} />

        {/* Formulario para añadir contacto */}
        <AddContactForm onAddContact={manejarAgregarContacto} />

        {/* Lista filtrada con FlatList */}
        <FlatList
          data={contactos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={Separador}
          ListEmptyComponent={EmptyState}
          contentContainerStyle={
            contactos.length === 0 ? styles.listaVacia : styles.listaContenido
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
}

// ─── Estilos ─────────────────────────────────────────────────
const COLORES = {
  fondo: '#f0f4ff',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },

  contenedor: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  listaContenido: {
    paddingBottom: 32,
  },
  listaVacia: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  separador: {
    height: 8,
  },
});
