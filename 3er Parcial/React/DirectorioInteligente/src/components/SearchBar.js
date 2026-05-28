import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const COLORES = {
  tarjeta: '#ffffff',
  texto: '#1a1f36',
  borde: '#e5e9f7',
  sombra: '#c7d0f0',
};

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={styles.buscadorContenedor}>
      <Text style={styles.lupaIcono}>🔎</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar contacto..."
        placeholderTextColor="#aab2c8"
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        returnKeyType="search"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buscadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORES.tarjeta,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    paddingHorizontal: 14,
    marginBottom: 16,
    // Sombra suave (iOS)
    shadowColor: COLORES.sombra,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    // Sombra (Android)
    elevation: 4,
  },
  lupaIcono: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
    color: COLORES.texto,
    fontWeight: '500',
  },
});
