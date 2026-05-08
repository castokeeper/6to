import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';

const memStore = {};
const Storage = {
  getItem: async (key) => {
    try {
      if (typeof localStorage !== 'undefined') {
        return Promise.resolve(localStorage.getItem(key));
      }
    } catch (_) { }
    return Promise.resolve(memStore[key] ?? null);
  },
  setItem: async (key, value) => {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
        return Promise.resolve();
      }
    } catch (_) { }
    memStore[key] = value;
    return Promise.resolve();
  },
};

const STORAGE_KEY = 'diario_notas';

export default function App() {
  const [texto, setTexto] = useState('');
  const [notas, setNotas] = useState([]);

  // Carga las notas guardadas al iniciar
  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    try {
      const data = await Storage.getItem(STORAGE_KEY);
      if (data) {
        setNotas(JSON.parse(data));
      }
    } catch (e) {
      console.error('Error cargando notas:', e);
    }
  };

  const guardarNotas = async (nuevasNotas) => {
    try {
      await Storage.setItem(STORAGE_KEY, JSON.stringify(nuevasNotas));
    } catch (e) {
      console.error('Error guardando notas:', e);
    }
  };

  const agregarNota = () => {
    if (!texto.trim()) {
      Alert.alert('Campo vacío', 'Escribe algo antes de guardar.');
      return;
    }

    const nuevaNota = {
      id: Date.now().toString(),
      contenido: texto.trim(),
      fecha: new Date().toLocaleString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const nuevasNotas = [nuevaNota, ...notas];
    setNotas(nuevasNotas);
    guardarNotas(nuevasNotas);
    setTexto(''); // Limpia el input tras guardar
  };

  const eliminarNota = (id) => {
    Alert.alert(
      'Eliminar nota',
      '¿Estás seguro de que quieres eliminar esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            const nuevasNotas = notas.filter((n) => n.id !== id);
            setNotas(nuevasNotas);
            guardarNotas(nuevasNotas);
          },
        },
      ]
    );
  };

  const renderNota = ({ item }) => (
    <View style={styles.tarjeta}>
      <View style={styles.tarjetaContenido}>
        <Text style={styles.notaFecha}>{item.fecha}</Text>
        <Text style={styles.notaTexto}>{item.contenido}</Text>
      </View>
      <TouchableOpacity
        style={styles.btnEliminar}
        onPress={() => eliminarNota(item.id)}
      >
        <Text style={styles.btnEliminarTexto}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📓 Diario Rápido</Text>
        <Text style={styles.headerSubtitle}>
          {notas.length} {notas.length === 1 ? 'entrada' : 'entradas'}
        </Text>
      </View>

      {/* Input para nueva nota */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="¿Qué tienes en mente hoy?"
          placeholderTextColor="#888"
          multiline
          maxLength={300}
        />
        <Text style={styles.contador}>{texto.length}/300</Text>
        <TouchableOpacity style={styles.btnGuardar} onPress={agregarNota}>
          <Text style={styles.btnGuardarTexto}>＋ Guardar Nota</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notas */}
      {notas.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioEmoji}>✍️</Text>
          <Text style={styles.vacioTexto}>No hay notas aún.</Text>
          <Text style={styles.vacioSubTexto}>¡Escribe tu primera entrada!</Text>
        </View>
      ) : (
        <FlatList
          data={notas}
          keyExtractor={(item) => item.id}
          renderItem={renderNota}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4a',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e0e0ff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8888bb',
    marginTop: 2,
  },

  // Input
  inputContainer: {
    backgroundColor: '#16213e',
    margin: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  input: {
    color: '#e0e0ff',
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  contador: {
    color: '#666699',
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  btnGuardar: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  btnGuardarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Lista
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  // Tarjeta de nota
  tarjeta: {
    backgroundColor: '#16213e',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: '#7c3aed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  tarjetaContenido: {
    flex: 1,
  },
  notaFecha: {
    fontSize: 11,
    color: '#8888bb',
    marginBottom: 6,
  },
  notaTexto: {
    fontSize: 15,
    color: '#d0d0ee',
    lineHeight: 22,
  },
  btnEliminar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  btnEliminarTexto: {
    color: '#ff6b8a',
    fontWeight: 'bold',
    fontSize: 13,
  },

  // Estado vacío
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  vacioEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  vacioTexto: {
    color: '#8888bb',
    fontSize: 18,
    fontWeight: '600',
  },
  vacioSubTexto: {
    color: '#555577',
    fontSize: 14,
    marginTop: 4,
  },
});
