import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const COLORES = {
  acento: '#4f6ef7',
  texto: '#1a1f36',
  textoSecundario: '#6b7280',
};

export default function Header({ cantidadResultados }) {
  return (
    <View style={styles.encabezado}>
      <Text style={styles.titulo}>El Directorio</Text>
      <Text style={styles.tituloAcento}>Inteligente</Text>
      <Text style={styles.subtitulo}>
        {cantidadResultados} resultado{cantidadResultados !== 1 ? 's' : ''} encontrado{cantidadResultados !== 1 ? 's' : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  encabezado: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORES.texto,
    letterSpacing: -0.5,
  },
  tituloAcento: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORES.acento,
    letterSpacing: -0.5,
    marginTop: -4,
  },
  subtitulo: {
    fontSize: 13,
    color: COLORES.textoSecundario,
    marginTop: 6,
    fontWeight: '500',
  },
});
