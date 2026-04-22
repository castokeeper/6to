import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useResponsive } from '@/hooks/use-responsive';

type Prioridad = 'Alta' | 'Media' | 'Baja';

interface ReporteProps {
  titulo: string;
  colonia: string;
  prioridad: Prioridad;
}

export default function Reporte({ titulo, colonia, prioridad }: ReporteProps) {
  const { fs, sp } = useResponsive();

  const colores: Record<Prioridad, { bg: string; text: string }> = {
    Alta: { bg: '#FFEBEE', text: '#D32F2F' },
    Media: { bg: '#FFF8E1', text: '#F57F17' },
    Baja: { bg: '#E8F5E9', text: '#2E7D32' },
  };

  const color = colores[prioridad];

  return (
    <View style={[styles.tarjeta, { padding: sp.md, marginBottom: sp.sm }]}>
      <Text style={[styles.tituloText, { fontSize: fs.lg, marginBottom: sp.sm }]}>
        {titulo}
      </Text>
      <View style={styles.fila}>
        <View style={[styles.badgePrioridad, { backgroundColor: color.bg }]}>
          <Text style={[styles.prioridadText, { fontSize: fs.sm, color: color.text }]}>
            ● {prioridad}
          </Text>
        </View>
        <Text style={[styles.coloniaText, { fontSize: fs.sm }]}>📍 {colonia}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#3F51B5',
  },
  tituloText: {
    fontWeight: 'bold',
    color: '#1A237E',
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
  prioridadText: {
    fontWeight: '700',
  },
  coloniaText: {
    color: '#607D8B',
    fontWeight: '500',
  },
});
