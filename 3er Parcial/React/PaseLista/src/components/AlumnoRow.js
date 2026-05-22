import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../styles/colors';

const { width } = Dimensions.get('window');
const isSmall = width < 380;

/**
 * Fila responsiva que representa a un alumno.
 * En pantallas pequeñas, el badge y botones se mueven debajo del nombre.
 */
export default function AlumnoRow({ alumno, onToggle, onEliminar }) {
  const { id, nombre, presente } = alumno;

  return (
    <View style={styles.row}>
      {/* Línea superior: ID + Nombre */}
      <View style={styles.topRow}>
        <Text style={styles.rowId}>{'#' + String(id).padStart(2, '0')}</Text>
        <Text style={styles.rowNombre} numberOfLines={1}>
          {nombre}
        </Text>
        {/* Badge de estado (siempre visible junto al nombre) */}
        <View
          style={[styles.badge, presente ? styles.badgePresente : styles.badgeAusente]}
        >
          <Text
            style={[
              styles.badgeText,
              presente ? styles.badgeTextPresente : styles.badgeTextAusente,
            ]}
          >
            {presente ? 'Asistencia ✅' : 'Falta ❌'}
          </Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.acciones}>
        <TouchableOpacity
          style={[
            styles.btnToggle,
            presente ? styles.btnRevert : styles.btnPresente,
          ]}
          onPress={() => onToggle(id)}
        >
          <Text
            style={[
              styles.btnToggleText,
              presente ? styles.btnRevertText : styles.btnPresenteText,
            ]}
          >
            {presente ? 'Ausente' : 'Presente'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDelete} onPress={() => onEliminar(id)}>
          <Text style={styles.btnDeleteText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.border,
    padding: 12,
    marginBottom: 8,
    flexDirection: isSmall ? 'column' : 'row',
    alignItems: isSmall ? 'stretch' : 'center',
    gap: isSmall ? 10 : 8,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  rowId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    minWidth: 28,
  },
  rowNombre: {
    fontSize: 13,
    color: COLORS.text,
    flex: 1,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgePresente: {
    backgroundColor: COLORS.presenteBg,
  },
  badgeAusente: {
    backgroundColor: COLORS.ausenteBg,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  badgeTextPresente: {
    color: COLORS.presenteText,
  },
  badgeTextAusente: {
    color: COLORS.ausenteText,
  },
  acciones: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: isSmall ? 'flex-end' : 'flex-start',
  },
  btnToggle: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 0.5,
  },
  btnPresente: {
    backgroundColor: COLORS.presenteBg,
    borderColor: COLORS.presenteBorder,
  },
  btnRevert: {
    backgroundColor: COLORS.ausenteBg,
    borderColor: COLORS.ausenteBorder,
  },
  btnToggleText: {
    fontSize: 12,
    fontWeight: '500',
  },
  btnPresenteText: {
    color: COLORS.presenteText,
  },
  btnRevertText: {
    color: COLORS.ausenteText,
  },
  btnDelete: {
    backgroundColor: COLORS.deleteBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: COLORS.deleteBorder,
  },
  btnDeleteText: {
    fontSize: 13,
  },
});
