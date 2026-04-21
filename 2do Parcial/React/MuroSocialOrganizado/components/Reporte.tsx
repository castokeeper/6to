import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Prioridad = 'Alta' | 'Media' | 'Baja';

interface ReporteProps {
  titulo: string;
  colonia: string;
  prioridad: Prioridad;
}

export default function Reporte({ titulo, colonia, prioridad }: ReporteProps) {
  const esPrioridadAlta = prioridad === 'Alta';

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.tituloText}>{titulo}</Text>
      <View style={styles.fila}>
        <View
          style={[
            styles.badgePrioridad,
            esPrioridadAlta
              ? styles.badgeAlta
              : prioridad === 'Media'
              ? styles.badgeMedia
              : styles.badgeBaja,
          ]}
        >
          <Text style={[styles.prioridadText, esPrioridadAlta && styles.prioridadAlta]}>
            ● {prioridad}
          </Text>
        </View>
        <Text style={styles.coloniaText}>📍 {colonia}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#3F51B5',
  },
  tituloText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgePrioridad: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeAlta: {
    backgroundColor: '#FFEBEE',
  },
  badgeMedia: {
    backgroundColor: '#FFF8E1',
  },
  badgeBaja: {
    backgroundColor: '#E8F5E9',
  },
  prioridadText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4CAF50',
  },
  prioridadAlta: {
    color: '#D32F2F',
  },
  coloniaText: {
    fontSize: 13,
    color: '#607D8B',
    fontWeight: '500',
  },
});
