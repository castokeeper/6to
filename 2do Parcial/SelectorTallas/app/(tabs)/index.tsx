import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const [seleccionada, setSeleccionada] = useState('M');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👕 Tienda de Ropa</Text>
      <Text style={styles.subtitulo}>Selecciona tu talla</Text>

      <View style={styles.filaBotones}>
        <TouchableOpacity
          style={[
            styles.boton,
            { backgroundColor: seleccionada === 'S' ? 'blue' : 'lightgray' },
          ]}
          onPress={() => setSeleccionada('S')}
        >
          <Text style={{ color: seleccionada === 'S' ? 'white' : 'black', fontSize: 20, fontWeight: 'bold' }}>
            S
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.boton,
            { backgroundColor: seleccionada === 'M' ? 'blue' : 'lightgray' },
          ]}
          onPress={() => setSeleccionada('M')}
        >
          <Text style={{ color: seleccionada === 'M' ? 'white' : 'black', fontSize: 20, fontWeight: 'bold' }}>
            M
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.boton,
            { backgroundColor: seleccionada === 'L' ? 'blue' : 'lightgray' },
          ]}
          onPress={() => setSeleccionada('L')}
        >
          <Text style={{ color: seleccionada === 'L' ? 'white' : 'black', fontSize: 20, fontWeight: 'bold' }}>
            L
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.textoInfo}>
        Talla seleccionada: <Text style={{ color: 'blue', fontWeight: 'bold' }}>{seleccionada}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 18,
    marginBottom: 30,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  boton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  textoInfo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
