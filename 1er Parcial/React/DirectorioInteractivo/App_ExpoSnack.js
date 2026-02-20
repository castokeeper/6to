import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

// ─── Componente Hijo: TarjetaUsuario ───────────────────────────────────
// Recibe props del padre (nombre, ocupacion, edad, color, onSeleccionar)
const TarjetaUsuario = (props) => {
    // Función que se ejecuta al presionar la tarjeta
    const manejarPresion = () => {
        // 1. Muestra la alerta nativa con el nombre del usuario
        Alert.alert('Usuario Seleccionado', `Has seleccionado a: ${props.nombre}`);
        // 2. Llama a la función del padre para actualizar el estado "seleccionado"
        props.onSeleccionar(props.nombre);
    };

    return (
        // TouchableOpacity envuelve la tarjeta para hacerla presionable
        <TouchableOpacity onPress={manejarPresion} activeOpacity={0.7}>
            <View style={[styles.tarjeta, { borderBottomColor: props.color }]}>
                <Text style={styles.nombre}>{props.nombre}</Text>
                <Text style={styles.detalle}>{props.ocupacion}</Text>
                <Text style={styles.detalle}>{props.edad} años</Text>
            </View>
        </TouchableOpacity>
    );
};

// ─── Componente Padre: App ─────────────────────────────────────────────
export default function App() {
    // Estado que guarda el nombre del último usuario seleccionado
    const [seleccionado, setSeleccionado] = useState('Ninguno');

    return (
        <View style={styles.contenedor}>
            <Text style={styles.tituloApp}>Directorio Interactivo</Text>

            {/* Texto fijo que muestra el último usuario seleccionado */}
            <View style={styles.estadoContenedor}>
                <Text style={styles.estadoTexto}>
                    Último seleccionado: {seleccionado}
                </Text>
            </View>

            <ScrollView>
                {/* Cada TarjetaUsuario recibe onSeleccionar={setSeleccionado} como prop */}
                <TarjetaUsuario nombre="Juan Pérez" ocupacion="Estudiante de 6to A" edad={16} color="red" onSeleccionar={setSeleccionado} />
                <TarjetaUsuario nombre="Maria Sosa" ocupacion="Estudiante de 6to B" edad={17} color="blue" onSeleccionar={setSeleccionado} />
                <TarjetaUsuario nombre="Pedro Luis" ocupacion="Jefe de Grupo" edad={16} color="green" onSeleccionar={setSeleccionado} />
                <TarjetaUsuario nombre="Ana García" ocupacion="Estudiante de 6to C" edad={15} color="orange" onSeleccionar={setSeleccionado} />
                <TarjetaUsuario nombre="Carlos López" ocupacion="Secretario de Grupo" edad={17} color="purple" onSeleccionar={setSeleccionado} />
                <TarjetaUsuario nombre="Sofía Ramírez" ocupacion="Estudiante de 6to A" edad={16} color="teal" onSeleccionar={setSeleccionado} />
            </ScrollView>
        </View>
    );
}

// ─── Estilos ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    tituloApp: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    estadoContenedor: {
        backgroundColor: '#e0e7ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#4f46e5',
    },
    estadoTexto: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4f46e5',
    },
    tarjeta: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 8,
        borderRadius: 10,
        borderBottomWidth: 4,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detalle: {
        color: '#666',
    },
});
