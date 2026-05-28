import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORES = {
  texto: '#1a1f36',
  textoSecundario: '#6b7280',
};

export default function EmptyState() {
  return (
    <View style={styles.sinResultadosContainer}>
      <Text style={styles.sinResultadosIcono}>🔍</Text>
      <Text style={styles.sinResultadosTexto}>No se encontraron resultados</Text>
      <Text style={styles.sinResultadosSubtexto}>
        Intenta con otra letra o palabra
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sinResultadosContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  sinResultadosIcono: {
    fontSize: 48,
    marginBottom: 16,
  },
  sinResultadosTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORES.texto,
    marginBottom: 6,
  },
  sinResultadosSubtexto: {
    fontSize: 14,
    color: COLORES.textoSecundario,
  },
});
