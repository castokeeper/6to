import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../styles/globalStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Campos requeridos', 'Por favor ingresa tu correo y contraseña.');
      return;
    }
    navigation.replace('Home');
  };

  const handleRegister = () => {
    Alert.alert('Registro', 'Función de registro próximamente disponible.');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-primary-dark"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 16 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center justify-center" style={{ paddingTop: insets.top + 40 }}>
          <View className="w-20 h-20 rounded-full bg-white/15 items-center justify-center mb-4">
            <Text className="text-[40px]">🌿</Text>
          </View>
          <Text className="text-4xl font-extrabold text-txt-light tracking-wider">VidaSana</Text>
          <Text className="text-sm text-white/70 mt-1">Tu camino hacia una vida saludable</Text>
        </View>

        <View className="flex-1 px-6 justify-center" style={{ minHeight: 320 }}>
          <View className="mb-4">
            <Text className="text-[13px] font-semibold text-white/70 mb-1 ml-1">Correo electrónico</Text>
            <TextInput
              className="bg-white/10 rounded-xl px-4 py-3.5 text-base text-txt-light border border-white/20"
              placeholder="ejemplo@correo.com"
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-[13px] font-semibold text-white/70 mb-1 ml-1">Contraseña</Text>
            <View className="relative">
              <TextInput
                className="bg-white/10 rounded-xl px-4 py-3.5 pr-12 text-base text-txt-light border border-white/20"
                placeholder="••••••••"
                placeholderTextColor="rgba(255,255,255,0.4)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-3.5"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text className="text-[18px]">{showPassword ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            title="Iniciar Sesión"
            onPress={handleLogin}
            color={COLORS.textLight}
            textColor={COLORS.primary}
            style={{ marginTop: 24 }}
          />

          <TouchableOpacity onPress={handleRegister} className="items-center mt-6">
            <Text className="text-sm text-white/60">
              ¿No tienes cuenta?{' '}
              <Text className="text-txt-light font-bold">Regístrate</Text>
            </Text>
          </TouchableOpacity>

          <View className="items-center mt-8 pt-4 border-t border-white/20">
            <Text className="text-[12px] font-semibold text-white/60 mb-2 tracking-widest uppercase">Desarrollado por:</Text>
            <Text className="text-[13px] font-medium text-white/90 mb-1">Edgar Antonio Venegas Bazan</Text>
            <Text className="text-[13px] font-medium text-white/90 mb-1">Victor Mojica Barrera</Text>
            <Text className="text-[13px] font-medium text-white/90">Angeles Sahian Patiño Silverio</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
