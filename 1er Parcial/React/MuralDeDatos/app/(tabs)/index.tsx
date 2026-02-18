import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.bloque1}>
        <Text style={styles.texto}> Edgar Antonio Venegas Bazán </Text>
      </View>

      <View style={styles.bloque2}>
        <Text style={styles.texto}> 6to A </Text>
      </View>

      <View style={styles.bloque3}>
        <Text style={styles.texto}>Programación</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  bloque1: {
    width: 110,
    height: 110,
    backgroundColor: '#e94560',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  bloque2: {
    width: 110,
    height: 110,
    backgroundColor: '#0f3460',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  bloque3: {
    width: 110,
    height: 110,
    backgroundColor: '#16c79a',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
