import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Alert,
  KeyboardAvoidingView, Platform, ScrollView, Image,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import { COLORS, globalStyles } from '../styles/globalStyles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Campos vacíos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Home');
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.logo}>🥦</Text>
          <Text style={styles.appName}>VidaSana</Text>
          <Text style={styles.tagline}>Tu compañero de vida saludable</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tu@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={COLORS.textLight}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
            placeholderTextColor={COLORS.textLight}
          />

          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            loading={loading}
            color={COLORS.primary}
            style={styles.loginBtn}
          />

          <CustomButton
            title="Entrar como invitado"
            onPress={() => navigation.replace('Home')}
            color="transparent"
            textColor={COLORS.primary}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 72,
    marginBottom: 8,
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: COLORS.textLight,
    marginTop: 6,
  },
  form: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.background,
  },
  loginBtn: {
    marginTop: 24,
  },
});

export default LoginScreen;
