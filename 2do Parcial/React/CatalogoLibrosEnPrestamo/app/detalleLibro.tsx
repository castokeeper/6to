import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useResponsive } from '@/hooks/use-responsive';

export default function DetalleLibro() {
  const { fs, sp, contentWidth, iconSize, iconFontSize } = useResponsive();

  // Recibimos los 3 datos pasados desde el catálogo
  const { titulo, autor, fechaDevolucion } = useLocalSearchParams<{
    titulo: string;
    autor: string;
    fechaDevolucion: string;
  }>();

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.content,
          {
            padding: sp.xl,
            maxWidth: contentWidth,
            alignSelf: 'center',
            width: '100%',
          },
        ]}
      >
        {/* Portada decorativa */}
        <View
          style={[
            styles.portada,
            {
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              marginBottom: sp.lg,
            },
          ]}
        >
          <Text style={{ fontSize: iconFontSize }}>📕</Text>
        </View>

        {/* Título — en color distinto (ámbar dorado) */}
        <Text style={[styles.titulo, { fontSize: fs.xxl, marginBottom: sp.md }]}>
          {titulo}
        </Text>

        {/* Separador */}
        <View style={[styles.separador, { marginBottom: sp.lg }]} />

        {/* Tarjeta de datos */}
        <View style={[styles.tarjeta, { padding: sp.lg, marginBottom: sp.lg, gap: sp.md }]}>

          <View style={styles.fila}>
            <Text style={[styles.etiqueta, { fontSize: fs.xs }]}>✍️ Autor</Text>
            <Text style={[styles.valor, { fontSize: fs.md }]}>{autor}</Text>
          </View>

          {/* Fecha de devolución — en negritas (el reto) */}
          <View style={[styles.fila, styles.filaDestacada]}>
            <Text style={[styles.etiqueta, { fontSize: fs.xs }]}>📅 Fecha de devolución</Text>
            <Text style={[styles.fechaDevolucion, { fontSize: fs.lg }]}>
              {fechaDevolucion}
            </Text>
          </View>

          <View style={styles.fila}>
            <Text style={[styles.etiqueta, { fontSize: fs.xs }]}>📌 Estado</Text>
            <View style={styles.badgePrestamo}>
              <Text style={[styles.badgeTexto, { fontSize: fs.sm }]}>En préstamo</Text>
            </View>
          </View>

        </View>

        {/* Aviso */}
        <View style={[styles.aviso, { padding: sp.md, marginBottom: sp.xl }]}>
          <Text style={[styles.avisoTexto, { fontSize: fs.xs }]}>
            ⚠️ Recuerda entregar el libro antes de la fecha de devolución para evitar penalizaciones.
          </Text>
        </View>

        {/* Botón regresar */}
        <TouchableOpacity
          style={[styles.boton, { paddingVertical: sp.md }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.botonTexto, { fontSize: fs.md }]}>← Regresar al catálogo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FB',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },

  // Portada
  portada: {
    backgroundColor: '#DDEAFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#3F6FD1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  // Título en color distinto (ámbar) — cumple el requisito
  titulo: {
    fontWeight: 'bold',
    color: '#B45309',
    textAlign: 'center',
    lineHeight: 34,
  },

  separador: {
    width: '80%',
    height: 2,
    backgroundColor: '#C5D5F5',
    borderRadius: 1,
  },

  // Tarjeta de datos
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    elevation: 4,
    shadowColor: '#1B3A6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#3F6FD1',
  },
  fila: {
    gap: 4,
  },
  filaDestacada: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: -10,
  },
  etiqueta: {
    color: '#78909C',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valor: {
    color: '#1B3A6B',
    fontWeight: '500',
  },

  // Fecha de devolución en negritas — cumple el requisito del reto
  fechaDevolucion: {
    fontWeight: 'bold',
    color: '#E65100',
  },

  // Badge "En préstamo"
  badgePrestamo: {
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 2,
  },
  badgeTexto: {
    color: '#1565C0',
    fontWeight: '700',
  },

  // Aviso
  aviso: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6F00',
  },
  avisoTexto: {
    color: '#6D4C00',
    lineHeight: 20,
  },

  // Botón regresar
  boton: {
    backgroundColor: '#1B3A6B',
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
