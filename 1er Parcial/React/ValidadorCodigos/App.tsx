import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Validador de Códigos</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe la clave secreta..."
        value={password}
        onChangeText={setPassword}
      />

      {password === 'REACT' && (
        <View style={styles.successBox}>
          <Text style={styles.successText}>
            ¡Código Correcto! Bienvenido al sistema.
          </Text>
          <Text style={styles.infoText}>Nombre: Edgar Antonio Venegas Bazan</Text>
          <Text style={styles.infoText}>Grupo: 6to Programacion</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  successBox: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
  },
});
