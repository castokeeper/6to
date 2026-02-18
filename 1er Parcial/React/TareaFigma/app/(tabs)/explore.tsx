import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export default function MiAppDeReportesScreen() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [profileTapped, setProfileTapped] = useState(false);

  const handleEnviar = () => {
    if (!nombre.trim()) {
      Alert.alert('⚠️ Campo requerido', 'Por favor ingresa tu nombre.');
      return;
    }
    if (!descripcion.trim()) {
      Alert.alert('⚠️ Campo requerido', 'Por favor ingresa una descripción del reporte.');
      return;
    }

    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      Alert.alert(
        '✅ Reporte Enviado',
        `Nombre: ${nombre}\nDescripción: ${descripcion}\n\n¡Gracias por tu reporte!`,
        [
          {
            text: 'Nuevo Reporte',
            onPress: () => {
              setNombre('');
              setDescripcion('');
            },
          },
          { text: 'OK' },
        ]
      );
    }, 1500);
  };

  const handleProfileTap = () => {
    setProfileTapped(!profileTapped);
    Alert.alert(
      '📸 Foto de Perfil',
      'Selecciona una opción:',
      [
        { text: 'Cámara', onPress: () => Alert.alert('📷', 'Se abriría la cámara') },
        { text: 'Galería', onPress: () => Alert.alert('🖼️', 'Se abriría la galería') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A4A4A" />

      {/* Dark Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi App de Reportes</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Circle */}
        <TouchableOpacity
          style={styles.profileCircleOuter}
          onPress={handleProfileTap}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.profileCircle,
              profileTapped && styles.profileCircleTapped,
            ]}
          >
            <Text style={styles.profileEmoji}>
              {profileTapped ? '📸' : '👤'}
            </Text>
          </View>
          <Text style={styles.profileHint}>Toca para cambiar foto</Text>
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre completo"
            placeholderTextColor="#aaa"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Descripción del Reporte</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe el problema que deseas reportar..."
            placeholderTextColor="#aaa"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Info cards */}
        <View style={styles.infoCards}>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📍</Text>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>Ubicación</Text>
              <Text style={styles.infoSub}>Se detectará automáticamente</Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📅</Text>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoTitle}>Fecha</Text>
              <Text style={styles.infoSub}>13 de Febrero, 2026</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ENVIAR Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.enviarButton, isSending && styles.enviarButtonDisabled]}
          onPress={handleEnviar}
          activeOpacity={0.8}
          disabled={isSending}
        >
          {isSending ? (
            <View style={styles.sendingRow}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.enviarText}>  ENVIANDO...</Text>
            </View>
          ) : (
            <Text style={styles.enviarText}>ENVIAR</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileCircleOuter: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 8,
  },
  profileCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#BDBDBD',
  },
  profileCircleTapped: {
    borderColor: '#6C63FF',
    backgroundColor: '#E8E6FF',
  },
  profileEmoji: {
    fontSize: 42,
  },
  profileHint: {
    marginTop: 8,
    fontSize: 13,
    color: '#999',
  },
  formSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#444',
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  infoCards: {
    paddingHorizontal: 24,
    marginTop: 20,
    gap: 10,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
  },
  infoSub: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 10,
    backgroundColor: '#FAFAFA',
  },
  enviarButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  enviarButtonDisabled: {
    backgroundColor: '#9e99ff',
  },
  enviarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  sendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
