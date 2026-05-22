import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../styles/colors';

/**
 * Sección de créditos con los nombres de los integrantes del equipo.
 */
export default function Creditos() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Integrantes</Text>
      <Text style={styles.texto}>Victor Adolfo Mojica Barrea</Text>
      <Text style={styles.texto}>Angeles Sahian Patiño Silverio</Text>
      <Text style={styles.texto}>Edgar Antonio Venegas Bazan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderColor: COLORS.border,
    paddingTop: 12,
    marginTop: 12,
    alignItems: 'center',
    paddingBottom: 8,
  },
  titulo: {
    fontSize: 11,
    fontWeight: '600',
    color: '#aaa',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  texto: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 3,
  },
});
