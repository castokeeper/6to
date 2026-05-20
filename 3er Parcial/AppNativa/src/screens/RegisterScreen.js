import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { registrarUsuario } from '../database/database';

const AVATARES = ['👤', '🧑‍💻', '👩‍💻', '🤖', '🎮', '🚀', '🦊', '🐱', '🎯', '💎'];

export default function RegisterScreen({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPass, setConfirmarPass] = useState('');
  const [avatarSeleccionado, setAvatarSeleccionado] = useState('👤');
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async () => {
    if (!nombre.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmarPass) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    if (password.length < 4) {
      Alert.alert('Error', 'La contraseña debe tener al menos 4 caracteres');
      return;
    }

    setCargando(true);
    try {
      await registrarUsuario(nombre.trim(), email.trim().toLowerCase(), password);
      Alert.alert('¡Éxito!', 'Cuenta creada correctamente. Ahora inicia sesión.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      if (error.message?.includes('UNIQUE')) {
        Alert.alert('Error', 'Ya existe una cuenta con ese correo electrónico');
      } else {
        Alert.alert('Error', 'No se pudo crear la cuenta');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>Únete a la comunidad tech</Text>
            </View>

            {/* Selector de Avatar */}
            <View style={styles.avatarSection}>
              <Text style={styles.label}>Elige tu avatar</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.avatarList}>
                  {AVATARES.map((av) => (
                    <TouchableOpacity
                      key={av}
                      onPress={() => setAvatarSeleccionado(av)}
                      style={[
                        styles.avatarButton,
                        avatarSeleccionado === av
                          ? styles.avatarButtonSelected
                          : styles.avatarButtonUnselected
                      ]}
                    >
                      <Text style={styles.avatarText}>{av}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View>
              <Text style={styles.label}>👤 Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre completo"
                placeholderTextColor="#64748b"
                value={nombre}
                onChangeText={setNombre}
              />
            </View>

            <View style={styles.marginTop}>
              <Text style={styles.label}>📧 Correo</Text>
              <TextInput
                style={styles.input}
                placeholder="tucorreo@email.com"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.marginTop}>
              <Text style={styles.label}>🔒 Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Mínimo 4 caracteres"
                placeholderTextColor="#64748b"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.marginTop}>
              <Text style={styles.label}>🔒 Confirmar contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Repite tu contraseña"
                placeholderTextColor="#64748b"
                value={confirmarPass}
                onChangeText={setConfirmarPass}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={[styles.registerButton, cargando && styles.registerButtonDisabled]}
              onPress={handleRegistro}
              disabled={cargando}
              activeOpacity={0.8}
            >
              {cargando ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginLinkButton} onPress={() => navigation.goBack()}>
              <Text style={styles.loginLinkText}>
                ¿Ya tienes cuenta?{' '}
                <Text style={styles.loginLinkTextBold}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#020617' },
  container: { flex: 1, backgroundColor: '#020617' },
  scrollContent: { flexGrow: 1 },
  innerContainer: { flex: 1, paddingHorizontal: 32, paddingVertical: 32 },
  header: { alignItems: 'center', marginBottom: 32, marginTop: 16 },
  title: { fontSize: 30, fontWeight: '800', color: '#fff' },
  subtitle: { color: '#94a3b8', fontSize: 16, marginTop: 8 },
  avatarSection: { marginBottom: 24 },
  label: { color: '#cbd5e1', fontSize: 14, fontWeight: '600', marginBottom: 12, marginLeft: 4 },
  avatarList: { flexDirection: 'row', gap: 8 },
  avatarButton: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  avatarButtonSelected: { backgroundColor: '#4f46e5', borderWidth: 2, borderColor: '#818cf8' },
  avatarButtonUnselected: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  avatarText: { fontSize: 24 },
  input: { backgroundColor: '#0f172a', borderColor: '#334155', borderWidth: 1, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, color: '#fff', fontSize: 16 },
  marginTop: { marginTop: 16 },
  registerButton: { marginTop: 32, borderRadius: 16, paddingVertical: 16, alignItems: 'center', backgroundColor: '#4f46e5' },
  registerButtonDisabled: { backgroundColor: '#3730a3' },
  registerButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loginLinkButton: { marginTop: 24, alignItems: 'center' },
  loginLinkText: { color: '#94a3b8', fontSize: 16 },
  loginLinkTextBold: { color: '#818cf8', fontWeight: 'bold' }
});
