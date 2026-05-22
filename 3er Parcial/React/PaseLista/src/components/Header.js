import { Dimensions, StyleSheet, Text, View } from 'react-native';
import COLORS from '../styles/colors';

const { width } = Dimensions.get('window');
const isSmall = width < 380;

/**
 * Encabezado con título, subtítulo y tarjetas de estadísticas.
 * Se apila verticalmente en pantallas pequeñas.
 */
export default function Header({ presentes, ausentes, total }) {
  return (
    <View style={styles.header}>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Lista de asistencia</Text>
        <Text style={styles.subtitle}>Registro de alumnos</Text>
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={[styles.statNum, { color: COLORS.presenteStat }]}>
            {presentes}
          </Text>
          <Text style={styles.statLabel}>Presentes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNum, { color: COLORS.ausenteStat }]}>
            {ausentes}
          </Text>
          <Text style={styles.statLabel}>Ausentes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNum}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: isSmall ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: isSmall ? 'stretch' : 'flex-start',
    marginBottom: 16,
    gap: isSmall ? 12 : 0,
  },
  titleWrap: {
    flex: isSmall ? 0 : 1,
    marginRight: isSmall ? 0 : 12,
  },
  title: {
    fontSize: isSmall ? 18 : 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: isSmall ? 'space-between' : 'flex-end',
  },
  stat: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: isSmall ? 0 : 58,
    flex: isSmall ? 1 : 0,
  },
  statNum: {
    fontSize: isSmall ? 16 : 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 1,
  },
});
