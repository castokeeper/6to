import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Switch, Alert, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  obtenerUsuario, actualizarPreferencias, eliminarCuenta,
} from '../database/database';

export default function SettingsScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [usuario, setUsuario] = useState(null);
  const [temaOscuro, setTemaOscuro] = useState(true);
  const [notificaciones, setNotificaciones] = useState(true);

  const cargarUsuario = async () => {
    try {
      const usr = await obtenerUsuario(usuarioId);
      setUsuario(usr);
      if (usr) {
        setTemaOscuro(usr.tema_oscuro === 1);
        setNotificaciones(usr.notificaciones === 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(useCallback(() => { cargarUsuario(); }, []));

  const handleToggleTema = async (value) => {
    setTemaOscuro(value);
    try {
      await actualizarPreferencias(usuarioId, value, notificaciones);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleNotificaciones = async (value) => {
    setNotificaciones(value);
    try {
      await actualizarPreferencias(usuarioId, temaOscuro, value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar Sesión', '¿Deseas salir de tu cuenta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar Sesión',
        onPress: () => navigation.replace('Login'),
      },
    ]);
  };

  const handleEliminarCuenta = () => {
    Alert.alert(
      '⚠️ Eliminar Cuenta',
      'Esta acción es irreversible. Se eliminarán todos tus datos, publicaciones y favoritos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar', style: 'destructive',
          onPress: async () => {
            try {
              await eliminarCuenta(usuarioId);
              Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente.');
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la cuenta');
            }
          },
        },
      ]
    );
  };

  const SettingItem = ({ icono, titulo, subtitulo, children, onPress }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingIconContainer}>
        <Text style={styles.settingIcon}>{icono}</Text>
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{titulo}</Text>
        {subtitulo && <Text style={styles.settingSubtitle}>{subtitulo}</Text>}
      </View>
      {children}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>⚙️ Configuración</Text>
            {usuario && <Text style={styles.headerSubtitle}>{usuario.email}</Text>}
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <SettingItem
          icono="👤"
          titulo="Mi Perfil"
          subtitulo="Ver y editar tu información"
          onPress={() => navigation.navigate('Profile', { usuarioId })}
        >
          <Text style={styles.chevron}>›</Text>
        </SettingItem>
        <SettingItem
          icono="⭐"
          titulo="Mis Favoritos"
          subtitulo="Publicaciones guardadas"
          onPress={() => navigation.navigate('Favorites', { usuarioId })}
        >
          <Text style={styles.chevron}>›</Text>
        </SettingItem>

        <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>Preferencias</Text>
        <SettingItem icono="🌙" titulo="Tema Oscuro" subtitulo="Apariencia de la aplicación">
          <Switch
            value={temaOscuro}
            onValueChange={handleToggleTema}
            trackColor={{ false: '#334155', true: '#4f46e5' }}
            thumbColor={temaOscuro ? '#a5b4fc' : '#94a3b8'}
          />
        </SettingItem>
        <SettingItem icono="🔔" titulo="Notificaciones" subtitulo="Recibir alertas de actividad">
          <Switch
            value={notificaciones}
            onValueChange={handleToggleNotificaciones}
            trackColor={{ false: '#334155', true: '#4f46e5' }}
            thumbColor={notificaciones ? '#a5b4fc' : '#94a3b8'}
          />
        </SettingItem>

        <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>Información</Text>
        <SettingItem icono="📱" titulo="Versión" subtitulo="TechConnect v1.0.0" />
        <SettingItem icono="⚡" titulo="Tecnologías" subtitulo="React Native · Expo · SQLite" />

        <Text style={[styles.sectionTitle, styles.sectionTitleMargin]}>Sesión</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleCerrarSesion}
        >
          <Text style={styles.actionIconLarge}>🚪</Text>
          <View>
            <Text style={styles.logoutTitle}>Cerrar Sesión</Text>
            <Text style={styles.logoutSubtitle}>Salir de tu cuenta</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleEliminarCuenta}
        >
          <Text style={styles.actionIconLarge}>⚠️</Text>
          <View>
            <Text style={styles.deleteTitle}>Eliminar Cuenta</Text>
            <Text style={styles.deleteSubtitle}>Esta acción es irreversible</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { backgroundColor: '#0f172a', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155', marginRight: 12 },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  headerSubtitle: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
  scrollContent: { flex: 1, paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginLeft: 8 },
  sectionTitleMargin: { marginTop: 16 },
  settingItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0f172a', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1e293b' },
  settingIconContainer: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  settingIcon: { fontSize: 20 },
  settingInfo: { flex: 1 },
  settingTitle: { color: '#fff', fontWeight: '600', fontSize: 16 },
  settingSubtitle: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  chevron: { color: '#64748b', fontSize: 18 },
  logoutButton: { backgroundColor: 'rgba(49, 46, 129, 0.5)', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#4338ca', flexDirection: 'row', alignItems: 'center' },
  actionIconLarge: { fontSize: 24, marginRight: 16 },
  logoutTitle: { color: '#a5b4fc', fontWeight: 'bold', fontSize: 16 },
  logoutSubtitle: { color: '#6366f1', fontSize: 12, marginTop: 4 },
  deleteButton: { backgroundColor: 'rgba(127, 29, 29, 0.3)', borderRadius: 16, padding: 16, marginBottom: 40, borderWidth: 1, borderColor: 'rgba(153, 27, 27, 0.5)', flexDirection: 'row', alignItems: 'center' },
  deleteTitle: { color: '#f87171', fontWeight: 'bold', fontSize: 16 },
  deleteSubtitle: { color: 'rgba(239, 68, 68, 0.6)', fontSize: 12, marginTop: 4 }
});
