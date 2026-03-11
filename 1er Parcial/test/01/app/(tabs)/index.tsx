import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  const [contraseña, setContraseña] = useState('');
  const [validacion, setValidacion] = useState(false);
  const [colorFondo, setColorFondo] = useState('#2c3e50');
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');

  const validarContraseña = () => {
    setValidacion(true);
    if (contraseña !== '2026') {
      setColorFondo('#c0392b');
    } else {
      setColorFondo('#1e8449');
    }
  };

  return (
    <View style={[styles.contenedor, { backgroundColor: colorFondo }]}>
      <Text style={styles.titulo}>Acceso</Text>



      <TextInput
        style={styles.entrada}
        placeholder="Escribe tu codigo"
        placeholderTextColor="#aaa"
        value={contraseña}
        onChangeText={(text) => {
          setValidacion(false);
          setContraseña(text);
          setColorFondo('#2c3e50');
        }}
      />

      <TouchableOpacity
        style={[styles.boton, !contraseña && styles.botonDeshabilitado]}
        onPress={validarContraseña}
        disabled={!contraseña}
        activeOpacity={0.8}
      >
        <Text style={styles.botonTexto}>Validar</Text>
      </TouchableOpacity>

      {validacion && contraseña === '2026' && (
        <View style={styles.tarjetaExito}>
          <TextInput
            placeholder="escribe tu nombre"
            onChangeText={(text) => {
              setNombre(text)
            }}
            style={styles.entrada} // Reusing existing style for consistency
          />
          <TextInput
            placeholder="escribe tu grado, grupo y especialidad"
            style={styles.especility}
            onChangeText={(text) => {
              setEspecialidad(text)
            }}
          />
        </View>
      )}

      {validacion && contraseña !== '2026' && (
        <View style={styles.tarjetaError}>
          <Text style={styles.acceso}> Incorrecto</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 30,
    letterSpacing: 1,
  },
  entrada: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#808080',
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  boton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  botonTexto: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  tarjetaExito: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  especility: {
    marginTop: 24,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  tarjetaError: {
    marginTop: 24,
    backgroundColor: '#000000',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  acceso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  info: {
    fontSize: 15,
    marginTop: 4,
  },
});