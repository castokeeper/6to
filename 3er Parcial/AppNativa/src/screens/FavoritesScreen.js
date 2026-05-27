import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerFavoritos, eliminarFavorito } from '../database/database';

export default function FavoritesScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [favoritos, setFavoritos] = useState([]);

  const cargarFavoritos = async () => {
    try {
      const favs = await obtenerFavoritos(usuarioId);
      setFavoritos(favs);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(useCallback(() => { cargarFavoritos(); }, []));

  const handleQuitarFavorito = async (pubId) => {
    Alert.alert('Quitar de favoritos', '¿Eliminar esta publicación de tus favoritos?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Quitar', style: 'destructive',
        onPress: async () => {
          try {
            await eliminarFavorito(usuarioId, pubId);
            await cargarFavoritos();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar de favoritos');
          }
        },
      },
    ]);
  };

  const formatearTiempo = (fechaStr) => {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    const ahora = new Date();
    const diff = Math.floor((ahora - fecha) / 60000);
    if (diff < 1) return 'Ahora';
    if (diff < 60) return `Hace ${diff} min`;
    if (diff < 1440) return `Hace ${Math.floor(diff / 60)}h`;
    return `Hace ${Math.floor(diff / 1440)}d`;
  };

  const renderFavorito = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Text style={styles.postAvatarText}>{item.autor_avatar || '👤'}</Text>
        </View>
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postAuthor}>{item.autor_nombre}</Text>
          <Text style={styles.postTime}>{formatearTiempo(item.created_at)}</Text>
        </View>
        <View style={styles.badgeSaved}>
          <Text style={styles.badgeSavedText}>⭐ Guardado</Text>
        </View>
      </View>

      <Text style={styles.postContent}>{item.contenido}</Text>

      <View style={styles.postFooter}>
        <View style={styles.postFooterLeft}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{item.categoria}</Text>
          </View>
          <Text style={styles.likesText}>❤️ {item.likes}</Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleQuitarFavorito(item.id)}
        >
          <Text style={styles.removeButtonText}>Quitar ✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>⭐ Mis Favoritos</Text>
            <Text style={styles.headerSubtitle}>
              {favoritos.length} {favoritos.length === 1 ? 'publicación guardada' : 'publicaciones guardadas'}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={favoritos}
        renderItem={renderFavorito}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📌</Text>
            <Text style={styles.emptyTitle}>Sin favoritos aún</Text>
            <Text style={styles.emptySubtitle}>
              Guarda publicaciones que te interesen tocando la estrella ⭐ en el feed
            </Text>
          </View>
        }
      />
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
  listContainer: { paddingTop: 12, paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { color: '#94a3b8', fontSize: 18, fontWeight: '600' },
  emptySubtitle: { color: '#64748b', fontSize: 14, marginTop: 8, textAlign: 'center', paddingHorizontal: 32 },
  postCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 20, marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1e293b' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  postAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center' },
  postAvatarText: { fontSize: 20 },
  postHeaderInfo: { marginLeft: 12, flex: 1 },
  postAuthor: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  postTime: { color: '#64748b', fontSize: 12 },
  badgeSaved: { backgroundColor: 'rgba(120, 53, 15, 0.4)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  badgeSavedText: { color: '#fcd34d', fontSize: 12, fontWeight: '600' },
  postContent: { color: '#e2e8f0', fontSize: 16, lineHeight: 24, marginBottom: 12 },
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1e293b', paddingTop: 12 },
  postFooterLeft: { flexDirection: 'row', alignItems: 'center' },
  categoryBadge: { backgroundColor: '#312e81', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16, marginRight: 12 },
  categoryBadgeText: { color: '#a5b4fc', fontSize: 12, fontWeight: '600' },
  likesText: { color: '#94a3b8', fontSize: 14 },
  removeButton: { backgroundColor: 'rgba(127, 29, 29, 0.3)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  removeButtonText: { color: '#f87171', fontSize: 14, fontWeight: '600' }
});
