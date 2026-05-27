import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  Alert, Modal, ScrollView, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  obtenerUsuario, obtenerPublicacionesUsuario, actualizarPerfil,
  eliminarPublicacion,
} from '../database/database';

const AVATARES = ['👤', '🧑‍💻', '👩‍💻', '🤖', '🎮', '🚀', '🦊', '🐱', '🎯', '💎'];

export default function ProfileScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [usuario, setUsuario] = useState(null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('👤');

  const cargarDatos = async () => {
    try {
      const usr = await obtenerUsuario(usuarioId);
      const pubs = await obtenerPublicacionesUsuario(usuarioId);
      setUsuario(usr);
      setPublicaciones(pubs);
      if (usr) {
        setNombre(usr.nombre);
        setBio(usr.bio || '');
        setAvatar(usr.avatar || '👤');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(useCallback(() => { cargarDatos(); }, []));

  const handleGuardar = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }
    try {
      await actualizarPerfil(usuarioId, nombre.trim(), bio.trim(), avatar);
      setEditando(false);
      await cargarDatos();
      Alert.alert('✅ Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  const handleEliminarPost = async (postId) => {
    Alert.alert('Eliminar publicación', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar', style: 'destructive',
        onPress: async () => {
          try {
            await eliminarPublicacion(postId);
            await cargarDatos();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar');
          }
        },
      },
    ]);
  };

  if (!usuario) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.bannerBackButton}
          >
            <Text style={styles.bannerBackButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{usuario.avatar || '👤'}</Text>
          </View>
          <Text style={styles.userName}>{usuario.nombre}</Text>
          <Text style={styles.userEmail}>{usuario.email}</Text>
          <Text style={styles.userBio}>
            {usuario.bio || 'Sin biografía'}
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{publicaciones.length}</Text>
              <Text style={styles.statLabel}>Publicaciones</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {publicaciones.reduce((s, p) => s + p.likes, 0)}
              </Text>
              <Text style={styles.statLabel}>Likes totales</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditando(true)}
          >
            <Text style={styles.editButtonText}>✏️ Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.postsContainer}>
          <Text style={styles.postsTitle}>Mis Publicaciones</Text>
          {publicaciones.length === 0 ? (
            <View style={styles.emptyPostsContainer}>
              <Text style={styles.emptyPostsIcon}>📝</Text>
              <Text style={styles.emptyPostsText}>Aún no has publicado nada</Text>
            </View>
          ) : (
            publicaciones.map((item) => (
              <View key={item.id} style={styles.postCard}>
                <View style={styles.postRow}>
                  <View style={styles.postContentWrapper}>
                    <View style={styles.postMetaRow}>
                      <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{item.categoria}</Text>
                      </View>
                      <Text style={styles.postDate}>{item.created_at}</Text>
                    </View>
                    <Text style={styles.postText}>{item.contenido}</Text>
                    <Text style={styles.postLikes}>❤️ {item.likes} likes</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEliminarPost(item.id)}
                    style={styles.deletePostButton}
                  >
                    <Text style={styles.deletePostIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal visible={editando} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Perfil</Text>
              <TouchableOpacity onPress={() => setEditando(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>Avatar</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarScroll}>
              <View style={styles.avatarList}>
                {AVATARES.map((av) => (
                  <TouchableOpacity
                    key={av}
                    onPress={() => setAvatar(av)}
                    style={[
                      styles.avatarSelectButton,
                      avatar === av ? styles.avatarSelectActive : styles.avatarSelectInactive
                    ]}
                  >
                    <Text style={styles.avatarSelectText}>{av}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Text style={styles.modalLabel}>Nombre</Text>
            <TextInput
              style={styles.modalInput}
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.modalLabel}>Biografía</Text>
            <TextInput
              style={[styles.modalInput, styles.modalInputMultiline]}
              value={bio}
              onChangeText={setBio}
              multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
              <Text style={styles.saveButtonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, backgroundColor: '#020617', alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: '#94a3b8', fontSize: 18 },
  container: { flex: 1, backgroundColor: '#020617' },
  banner: { height: 144, backgroundColor: '#4338ca', position: 'relative' },
  bannerBackButton: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  bannerBackButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  profileInfoContainer: { alignItems: 'center', marginTop: -56, paddingHorizontal: 24 },
  avatarContainer: { width: 112, height: 112, borderRadius: 56, backgroundColor: '#1e293b', borderWidth: 4, borderColor: '#020617', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 48 },
  userName: { fontSize: 24, fontWeight: '800', color: '#fff', marginTop: 12 },
  userEmail: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
  userBio: { color: '#cbd5e1', fontSize: 16, marginTop: 8, textAlign: 'center', paddingHorizontal: 16 },
  statsContainer: { flexDirection: 'row', marginTop: 20, gap: 32 },
  statItem: { alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  statLabel: { color: '#94a3b8', fontSize: 12 },
  editButton: { marginTop: 20, backgroundColor: '#4f46e5', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 16 },
  editButtonText: { color: '#fff', fontWeight: 'bold' },
  postsContainer: { marginTop: 32, paddingHorizontal: 16, paddingBottom: 32 },
  postsTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  emptyPostsContainer: { alignItems: 'center', paddingVertical: 40 },
  emptyPostsIcon: { fontSize: 36, marginBottom: 8 },
  emptyPostsText: { color: '#94a3b8' },
  postCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1e293b' },
  postRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  postContentWrapper: { flex: 1, marginRight: 8 },
  postMetaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  categoryBadge: { backgroundColor: '#312e81', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginRight: 8 },
  categoryBadgeText: { color: '#a5b4fc', fontSize: 12, fontWeight: '600' },
  postDate: { color: '#64748b', fontSize: 12 },
  postText: { color: '#e2e8f0', fontSize: 16 },
  postLikes: { color: '#64748b', fontSize: 12, marginTop: 8 },
  deletePostButton: { backgroundColor: 'rgba(127, 29, 29, 0.3)', padding: 8, borderRadius: 12 },
  deletePostIcon: { fontSize: 14 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0f172a', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderTopWidth: 1, borderTopColor: '#334155' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  modalClose: { color: '#94a3b8', fontSize: 24 },
  modalLabel: { color: '#cbd5e1', fontSize: 14, marginBottom: 8 },
  avatarScroll: { marginBottom: 16 },
  avatarList: { flexDirection: 'row', gap: 8 },
  avatarSelectButton: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  avatarSelectActive: { backgroundColor: '#4f46e5', borderWidth: 2, borderColor: '#818cf8' },
  avatarSelectInactive: { backgroundColor: '#1e293b' },
  avatarSelectText: { fontSize: 20 },
  modalInput: { backgroundColor: '#1e293b', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, color: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#334155' },
  modalInputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#4f46e5', borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
