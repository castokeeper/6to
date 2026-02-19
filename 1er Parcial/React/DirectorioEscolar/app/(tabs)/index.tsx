import { Text, View, StyleSheet, ScrollView } from 'react-native';

const TarjetaUsuario = (props: { nombre: string; ocupacion: string; edad: number; color: string }) => {
  return (
    <View style={[styles.tarjeta, { borderBottomColor: props.color }]}>
      <Text style={styles.nombre}>{props.nombre}</Text>
      <Text style={styles.detalle}>{props.ocupacion}</Text>
      <Text style={styles.detalle}>{props.edad} años</Text>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloApp}>Directorio Escolar</Text>
      <ScrollView>
        <TarjetaUsuario nombre="Juan Pérez" ocupacion="Estudiante de 6to A" edad={16} color="red" />
        <TarjetaUsuario nombre="Maria Sosa" ocupacion="Estudiante de 6to B" edad={17} color="blue" />
        <TarjetaUsuario nombre="Pedro Luis" ocupacion="Jefe de Grupo" edad={16} color="green" />
        <TarjetaUsuario nombre="Ana García" ocupacion="Estudiante de 6to C" edad={15} color="orange" />
        <TarjetaUsuario nombre="Carlos López" ocupacion="Secretario de Grupo" edad={17} color="purple" />
        <TarjetaUsuario nombre="Sofía Ramírez" ocupacion="Estudiante de 6to A" edad={16} color="teal" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 50 },
  tituloApp: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  tarjeta: { backgroundColor: 'white', padding: 20, marginHorizontal: 20, marginVertical: 8, borderRadius: 10, borderBottomWidth: 4 },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  detalle: { color: '#666' },
});
