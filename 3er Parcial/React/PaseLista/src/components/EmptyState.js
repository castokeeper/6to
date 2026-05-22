import { Dimensions, StyleSheet, Text, View } from 'react-native';
import COLORS from '../styles/colors';

const { width } = Dimensions.get('window');

/**
 * Estado vacío que se muestra cuando no hay alumnos registrados.
 */
export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📋</Text>
      <Text style={styles.text}>
        No hay alumnos registrados.{'\n'}Presiona "Registrar alumno" para
        comenzar.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: width < 380 ? 40 : 48,
    marginBottom: 12,
  },
  text: {
    fontSize: width < 380 ? 13 : 14,
    color: COLORS.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
