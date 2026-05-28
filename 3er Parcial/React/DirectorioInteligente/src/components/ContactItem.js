import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const COLORES = {
  tarjeta: '#ffffff',
  acento: '#4f6ef7',
  acentoClaro: '#eef1ff',
  texto: '#1a1f36',
  sombra: '#c7d0f0',
  peligro: '#ef4444',
  peligroClaro: '#fee2e2',
};

export default function ContactItem({ id, nombre, onRemove }) {
  const inicial = nombre.length > 0 ? nombre[0].toUpperCase() : '?';

  return (
    <View style={styles.item}>
      {/* Inicial decorativa */}
      <View style={styles.avatar}>
        <Text style={styles.avatarTexto}>{inicial}</Text>
      </View>
      
      {/* Nombre de contacto */}
      <View style={styles.textoContenedor}>
        <Text style={styles.itemTexto}>{nombre}</Text>
      </View>
      
      {/* Botón de eliminación */}
      <TouchableOpacity 
        style={styles.botonEliminar} 
        onPress={() => onRemove(id)}
        activeOpacity={0.6}
      >
        <Text style={styles.iconoEliminar}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORES.tarjeta,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    // Sombra (iOS)
    shadowColor: COLORES.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Sombra (Android)
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORES.acentoClaro,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarTexto: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORES.acento,
  },
  textoContenedor: {
    flex: 1,
  },
  itemTexto: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORES.texto,
  },
  botonEliminar: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORES.peligroClaro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoEliminar: {
    fontSize: 14,
    color: COLORES.peligro,
  },
});
