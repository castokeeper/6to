import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.bienvenida}>¡Bienvenido!</Text>
      <Text style={styles.nombre}>Edgar Antonio Venegas Bazan</Text>
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
  },
  bienvenida: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nombre: {
    fontSize: 18,
    color: '#555',
  },
});
