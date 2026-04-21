import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function NuevoReporteScreen() {
  const router = useRouter();
  const [problema, setProblema] = useState('');

  const handleEnviar = () => {
    if (!problema.trim()) {
      Alert.alert('Campo vacío', 'Por favor describe el problema antes de enviar.');
      return;
    }

    Alert.alert(
      '✅ Reporte Enviado',
      `Tu reporte sobre "${problema}" ha sido recibido. Gracias por contribuir a tu comunidad.`,
      [
        {
          text: 'Aceptar',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        {/* Ícono */}
        <Text style={styles.cardIcon}>📋</Text>

        {/* Instrucción */}
        <Text style={styles.label}>Describe el problema</Text>
        <Text style={styles.hint}>
          Ej: Bache, Alumbrado público apagado, Basura acumulada…
        </Text>

        {/* Input */}
        <TextInput
          style={styles.input}
          placeholder="Escribe el problema aquí..."
          placeholderTextColor="#A0AEC0"
          value={problema}
          onChangeText={setProblema}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        {/* Botón enviar */}
        <TouchableOpacity
          style={[styles.button, !problema.trim() && styles.buttonDisabled]}
          onPress={handleEnviar}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>📤  Enviar Reporte</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#3B5BDB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  cardIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2B6B',
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    color: '#7A8AA0',
    marginBottom: 16,
    lineHeight: 18,
  },
  input: {
    backgroundColor: '#F7F9FF',
    borderWidth: 1.5,
    borderColor: '#D0D8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A2B6B',
    minHeight: 110,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#3B5BDB',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#3B5BDB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#A5B4E8',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
