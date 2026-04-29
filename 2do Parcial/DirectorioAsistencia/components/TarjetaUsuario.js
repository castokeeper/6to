import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TarjetaUsuario({ usuario, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.nombre}>{usuario.name}</Text>
        <Text style={styles.ciudad}>{usuario.address.city}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  ciudad: {
    marginTop: 4,
    fontSize: 15,
    color: '#4b5563',
  },
});
