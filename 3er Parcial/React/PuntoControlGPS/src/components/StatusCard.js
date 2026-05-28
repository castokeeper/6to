import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import COLORS from '../styles/colors';

export default function StatusCard({ estaDentro, estatusEscuela }) {
  return (
    <View style={[styles.statusCard, estaDentro ? styles.cardSuccess : styles.cardDanger]}>
      <Text style={styles.statusLabel}>ESTATUS DE CONTROL</Text>
      <Text style={[styles.statusValue, estaDentro ? styles.textSuccess : styles.textDanger]}>
        {estatusEscuela}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    width: '100%',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSuccess: {
    backgroundColor: COLORS.emeraldLight,
    borderColor: COLORS.emeraldBorder,
  },
  cardDanger: {
    backgroundColor: COLORS.redLight,
    borderColor: COLORS.redBorder,
  },
  statusLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.slate400,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  textSuccess: {
    color: COLORS.emeraldText,
  },
  textDanger: {
    color: COLORS.redText,
  },
});
