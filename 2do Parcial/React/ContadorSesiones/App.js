import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'session_count';

export default function App() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const incrementCount = async () => {
      try {
        // 1. Recuperar el valor guardado
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const previous = stored !== null ? parseInt(stored, 10) : 0;

        // 2. Incrementar en 1
        const newCount = previous + 1;

        // 3. Persistir el nuevo valor
        await AsyncStorage.setItem(STORAGE_KEY, String(newCount));

        // 4. Actualizar el estado para mostrar en UI
        setCount(newCount);
      } catch (error) {
        console.error('Error al acceder a AsyncStorage:', error);
      }
    };

    incrementCount();
  }, []); // Se ejecuta solo al montar el componente (apertura de la app)

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.card}>
        <Text style={styles.emoji}>📱</Text>
        <Text style={styles.title}>Contador de Sesiones</Text>

        {count !== null ? (
          <Text style={styles.message}>
            Has abierto esta app{' '}
            <Text style={styles.highlight}>{count}</Text>{' '}
            {count === 1 ? 'vez' : 'veces'}
          </Text>
        ) : (
          <Text style={styles.loading}>Cargando...</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e94560',
    marginBottom: 24,
    letterSpacing: 1,
  },
  message: {
    fontSize: 20,
    color: '#a8b2d8',
    textAlign: 'center',
    lineHeight: 30,
  },
  highlight: {
    fontSize: 36,
    fontWeight: '900',
    color: '#e94560',
  },
  loading: {
    fontSize: 18,
    color: '#a8b2d8',
    fontStyle: 'italic',
  },
});
