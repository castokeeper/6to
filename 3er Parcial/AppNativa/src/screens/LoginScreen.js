import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { iniciarSesion, insertarDatosEjemplo } from '../database/database';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    setCargando(true);
    try {
      const usuario = await iniciarSesion(email.trim().toLowerCase(), password);
      if (usuario) {
        await insertarDatosEjemplo(usuario.id);
        navigation.replace('Home', { usuarioId: usuario.id });
      } else {
        Alert.alert('Error', 'Email o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al iniciar sesión');
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
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>⚡</Text>
              </View>
              <Text style={styles.title}>TechConnect</Text>
              <Text style={styles.subtitle}>
                La comunidad tech que te conecta
              </Text>
            </View>

            <View>
              <Text style={styles.label}>📧 Correo electrónico</Text>
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
              <View style={styles.relative}>
                <TextInput
                  style={[styles.input, styles.inputPassword]}
                  placeholder="Tu contraseña"
                  placeholderTextColor="#64748b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!mostrarPassword}
                />
                <TouchableOpacity style={styles.eyeButton} onPress={() => setMostrarPassword(!mostrarPassword)}>
                  <Text style={styles.eyeText}>
                    {mostrarPassword ? 'Ocultar' : 'Mostrar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, cargando && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={cargando}
              activeOpacity={0.8}
            >
              {cargando ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.7}
            >
              <Text style={styles.registerButtonText}>Crear Cuenta Nueva</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                TechConnect v1.0 — Proyecto de App Nativa
              </Text>
              <View style={styles.authorsContainer}>
                <Text style={styles.authorText}>Autores:</Text>
                <Text style={styles.authorText}>Edgar Antonio Venegas Bazan</Text>
                <Text style={styles.authorText}>Angeles Sahian Patiño Silverio</Text>
                <Text style={styles.authorText}>Victor Adolfo Mojica Barrera</Text>
              </View>
            </View>
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
  innerContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: 32, paddingVertical: 48 },
  header: { alignItems: 'center', marginBottom: 48 },
  logoContainer: { width: 96, height: 96, borderRadius: 24, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  logoText: { fontSize: 48 },
  title: { fontSize: 36, fontWeight: '800', color: '#fff' },
  subtitle: { color: '#94a3b8', fontSize: 16, marginTop: 8, textAlign: 'center' },
  label: { color: '#cbd5e1', fontSize: 14, fontWeight: '600', marginBottom: 8, marginLeft: 4 },
  input: { backgroundColor: '#0f172a', borderColor: '#334155', borderWidth: 1, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, color: '#fff', fontSize: 16 },
  marginTop: { marginTop: 16 },
  relative: { position: 'relative' },
  inputPassword: { paddingRight: 64 },
  eyeButton: { position: 'absolute', right: 16, top: 16 },
  eyeText: { color: '#818cf8', fontSize: 14, fontWeight: '600' },
  loginButton: { marginTop: 32, borderRadius: 16, paddingVertical: 16, alignItems: 'center', backgroundColor: '#4f46e5' },
  loginButtonDisabled: { backgroundColor: '#3730a3' },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 32 },
  divider: { flex: 1, height: 1, backgroundColor: '#334155' },
  dividerText: { color: '#64748b', marginHorizontal: 16, fontSize: 14 },
  registerButton: { borderWidth: 2, borderColor: '#4f46e5', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  registerButtonText: { color: '#818cf8', fontSize: 18, fontWeight: 'bold' },
  footer: { marginTop: 32, alignItems: 'center' },
  footerText: { color: '#475569', fontSize: 12, textAlign: 'center' },
  authorsContainer: { marginTop: 12, alignItems: 'center' },
  authorText: { color: '#64748b', fontSize: 12, textAlign: 'center', marginTop: 2 }
});
