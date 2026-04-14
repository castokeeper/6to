import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function RegistroScreen() {
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');

  const handleRegistrar = () => {
    if (usuario.trim().length === 0 || correo.trim().length === 0) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
    } else {
      Alert.alert('¡Bienvenido!', `¡Bienvenido, ${usuario}!`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.titulo}>Crear Cuenta</Text>
        <Text style={styles.subtitulo}>Completa los campos para registrarte</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#9CA3AF"
          value={usuario}
          onChangeText={setUsuario}
          autoCapitalize="words"
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#9CA3AF"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.boton} onPress={handleRegistrar} activeOpacity={0.85}>
          <Text style={styles.botonTexto}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#0F172A',
    borderWidth: 1.5,
    borderColor: '#334155',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#F1F5F9',
    marginBottom: 16,
  },
  boton: {
    width: '100%',
    backgroundColor: '#6366F1',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
