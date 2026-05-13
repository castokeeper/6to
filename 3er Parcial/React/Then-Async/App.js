import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [modoActual, setModoActual] = useState('async');

  const cargarConThen = () => {
    setCargando(true);
    setUsuarios([]);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      })
      .finally(() => {
        setCargando(false);
      });
  };

  const cargarConAsync = async () => {
    setCargando(true);
    setUsuarios([]);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarConAsync();
  }, []);

  const usuariosFiltrados = busqueda.trim()
    ? usuarios.filter((u) =>
        u.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : usuarios;

  const cambiarModo = (modo) => {
    setModoActual(modo);
    setBusqueda('');
    if (modo === 'then') {
      cargarConThen();
    } else {
      cargarConAsync();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.titulo}>Directorio de Usuarios</Text>

      <View style={styles.selectorRow}>
        <TouchableOpacity
          style={[styles.boton, modoActual === 'then' && styles.botonActivo]}
          onPress={() => cambiarModo('then')}
        >
          <Text style={[styles.botonTexto, modoActual === 'then' && styles.botonTextoActivo]}>
            .then()
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, modoActual === 'async' && styles.botonActivo]}
          onPress={() => cambiarModo('async')}
        >
          <Text style={[styles.botonTexto, modoActual === 'async' && styles.botonTextoActivo]}>
            async/await
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.etiquetaContainer}>
        <Text style={styles.etiquetaTexto}>
          Modo activo:{' '}
          <Text style={styles.etiquetaDestacado}>
            {modoActual === 'then' ? 'fetch con .then()' : 'fetch con async/await'}
          </Text>
        </Text>
      </View>

      <TextInput
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={(texto) =>
          setBusqueda(texto.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ''))
        }
        style={styles.input}
      />

      {cargando ? (
        <View style={styles.centrado}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.cargandoTexto}>Cargando usuarios...</Text>
        </View>
      ) : usuariosFiltrados.length === 0 ? (
        <Text style={styles.sinResultados}>Sin coincidencias</Text>
      ) : (
        <FlatList
          data={usuariosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.nombre}>{item.name}</Text>
              <Text style={styles.detalle}>📧 {item.email}</Text>
              <Text style={styles.detalle}>📞 {item.phone}</Text>
              <Text style={styles.detalle}>🏢 {item.company.name}</Text>
              <Text style={styles.detalle}>📍 {item.address.city}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  boton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#6366f1',
    alignItems: 'center',
  },
  botonActivo: {
    backgroundColor: '#6366f1',
  },
  botonTexto: {
    color: '#6366f1',
    fontWeight: '600',
    fontSize: 14,
  },
  botonTextoActivo: {
    color: '#fff',
  },
  etiquetaContainer: {
    backgroundColor: '#eef2ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  etiquetaTexto: {
    fontSize: 13,
    color: '#475569',
  },
  etiquetaDestacado: {
    color: '#6366f1',
    fontWeight: '700',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  lista: {
    paddingBottom: 24,
  },
  tarjeta: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  nombre: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
  },
  detalle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  cargandoTexto: {
    color: '#64748b',
    fontSize: 14,
  },
  sinResultados: {
    textAlign: 'center',
    color: '#94a3b8',
    marginTop: 20,
    fontSize: 15,
  },
});
