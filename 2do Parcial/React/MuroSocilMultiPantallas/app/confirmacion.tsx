import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useResponsive } from '@/hooks/use-responsive';

type Prioridad = 'Alta' | 'Media' | 'Baja';

const COLORES_PRIORIDAD: Record<Prioridad, { bg: string; text: string }> = {
  Alta: { bg: '#FFEBEE', text: '#D32F2F' },
  Media: { bg: '#FFF8E1', text: '#F57F17' },
  Baja: { bg: '#E8F5E9', text: '#2E7D32' },
};

export default function Confirmacion() {
  const { fs, sp, contentWidth, iconSize, iconFontSize } = useResponsive();

  const { problema, colonia, prioridad } = useLocalSearchParams<{
    problema: string;
    colonia: string;
    prioridad: Prioridad;
  }>();

  const colores = COLORES_PRIORIDAD[prioridad ?? 'Media'];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inner,
          { maxWidth: contentWidth, padding: sp.xl },
        ]}
      >
        {/* Ícono de éxito */}
        <View
          style={[
            styles.iconoCirculo,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              marginBottom: sp.lg,
            },
          ]}
        >
          <Text style={{ fontSize: iconFontSize }}>✅</Text>
        </View>

        <Text style={[styles.titulo, { fontSize: fs.xxl, marginBottom: sp.xs }]}>
          ¡Reporte Enviado!
        </Text>
        <Text style={[styles.subtitulo, { fontSize: fs.sm, marginBottom: sp.xl }]}>
          Gracias por contribuir a la mejora de tu comunidad.
        </Text>

        {/* Resumen del reporte */}
        <View style={[styles.tarjeta, { padding: sp.lg, marginBottom: sp.xl }]}>
          <Text style={[styles.tarjetaTitulo, { fontSize: fs.md, marginBottom: sp.sm }]}>
            Resumen del Reporte
          </Text>

          <View style={styles.fila}>
            <Text style={[styles.etiqueta, { fontSize: fs.sm }]}>📝 Problema:</Text>
            <Text style={[styles.valor, { fontSize: fs.sm }]}>{problema}</Text>
          </View>

          <View style={styles.fila}>
            <Text style={[styles.etiqueta, { fontSize: fs.sm }]}>📍 Colonia:</Text>
            <Text style={[styles.valor, { fontSize: fs.sm }]}>{colonia}</Text>
          </View>

          <View style={styles.fila}>
            <Text style={[styles.etiqueta, { fontSize: fs.sm }]}>⚠️ Prioridad:</Text>
            <View style={[styles.badge, { backgroundColor: colores.bg }]}>
              <Text style={[styles.badgeTexto, { fontSize: fs.sm, color: colores.text }]}>
                ● {prioridad}
              </Text>
            </View>
          </View>
        </View>

        {/* Botón volver al inicio */}
        <TouchableOpacity
          style={[styles.boton, { paddingVertical: sp.md }]}
          onPress={() => router.navigate('/')}
        >
          <Text style={[styles.botonTexto, { fontSize: fs.md }]}>🏠 Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    alignItems: 'center',
  },
  iconoCirculo: {
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#607D8B',
    textAlign: 'center',
    lineHeight: 22,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderLeftWidth: 5,
    borderLeftColor: '#3F51B5',
  },
  tarjetaTitulo: {
    fontWeight: 'bold',
    color: '#3F51B5',
    borderBottomWidth: 1,
    borderBottomColor: '#E3E6F3',
    paddingBottom: 8,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  etiqueta: {
    fontWeight: '700',
    color: '#455A64',
    minWidth: 90,
  },
  valor: {
    color: '#212121',
    flex: 1,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgeTexto: {
    fontWeight: '700',
  },
  boton: {
    backgroundColor: '#3F51B5',
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
