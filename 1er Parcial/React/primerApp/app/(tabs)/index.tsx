import { Image } from 'expo-image';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Nombre: Edgar Antonio Venegas Bazán </Text>
      <Text style={styles.text}> Grado y Grupo: 6to "A"</Text>
      <Text style={styles.text} > Modulo: IV - Desarrollo de Aplicaciones Moviles Multiplataforma </Text>
      <Text style={styles.text} > Submodulo: II - Implementa Aplicaciones Moviles Multiplataforma </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});