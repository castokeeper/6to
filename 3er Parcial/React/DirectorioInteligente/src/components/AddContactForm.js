import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';

const COLORES = {
  tarjeta: '#ffffff',
  acento: '#4f6ef7',
  acentoClaro: '#eef1ff',
  texto: '#1a1f36',
  borde: '#e5e9f7',
  sombra: '#c7d0f0',
};

export default function AddContactForm({ onAddContact }) {
  const [nombre, setNombre] = useState('');

  const manejarEnvio = () => {
    if (nombre.trim() === '') return;
    onAddContact(nombre.trim());
    setNombre('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.input}
        placeholder="Añadir nuevo contacto..."
        placeholderTextColor="#aab2c8"
        value={nombre}
        onChangeText={setNombre}
        autoCorrect={false}
        returnKeyType="done"
        onSubmitEditing={manejarEnvio}
      />
      <TouchableOpacity
        style={[styles.boton, nombre.trim() === '' && styles.botonDeshabilitado]}
        onPress={manejarEnvio}
        disabled={nombre.trim() === ''}
        activeOpacity={0.7}
      >
        <Text style={styles.botonTexto}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: COLORES.tarjeta,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORES.texto,
    fontWeight: '500',
    marginRight: 10,
    // Sombra
    shadowColor: COLORES.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  boton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORES.acento,
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra
    shadowColor: COLORES.acento,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  botonDeshabilitado: {
    backgroundColor: '#cbd5e1',
    shadowOpacity: 0,
    elevation: 0,
  },
  botonTexto: {
    fontSize: 16,
    color: '#ffffff',
  },
});
