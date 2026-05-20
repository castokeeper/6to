import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  Alert, Modal, RefreshControl, StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import {
  obtenerPublicaciones, crearPublicacion, darLike,
  agregarFavorito, eliminarFavorito, esFavorito,
  obtenerUsuario,
} from '../database/database';

const CATEGORIAS = ['General', 'Desarrollo', 'Tips', 'Herramientas', 'Noticias', 'Comunidad'];

export default function HomeScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [publicaciones, setPublicaciones] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoContenido, setNuevoContenido] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('General');
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [favoritosMap, setFavoritosMap] = useState({});
  const [refrescando, setRefrescando] = useState(false);

  const cargarDatos = async () => {
    try {
      const [pubs, usr] = await Promise.all([
        obtenerPublicaciones(),
        obtenerUsuario(usuarioId),
      ]);
      setPublicaciones(pubs);
      setUsuario(usr);

      const favMap = {};
      for (const pub of pubs) {
        favMap[pub.id] = await esFavorito(usuarioId, pub.id);
      }
      setFavoritosMap(favMap);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const onRefresh = async () => {
    setRefrescando(true);
    await cargarDatos();
    setRefrescando(false);
  };

  const handlePublicar = async () => {
    if (!nuevoContenido.trim()) {
      Alert.alert('Error', 'Escribe algo para publicar');
      return;
    }
    try {
      await crearPublicacion(usuarioId, nuevoContenido.trim(), categoriaSeleccionada);
      setNuevoContenido('');
      setCategoriaSeleccionada('General');
      setModalVisible(false);
      await cargarDatos();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la publicación');
    }
  };

  const handleLike = async (pubId) => {
    try {
      await darLike(pubId);
      await cargarDatos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorito = async (pubId) => {
    try {
      if (favoritosMap[pubId]) {
        await eliminarFavorito(usuarioId, pubId);
      } else {
        await agregarFavorito(usuarioId, pubId);
      }
      setFavoritosMap(prev => ({ ...prev, [pubId]: !prev[pubId] }));
    } catch (error) {
      console.error(error);
    }
  };

  const publicacionesFiltradas = filtroCategoria === 'Todas'
    ? publicaciones
    : publicaciones.filter(p => p.categoria === filtroCategoria);

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

  const renderPublicacion = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.postAvatar}>
          <Text style={styles.postAvatarText}>{item.autor_avatar || '👤'}</Text>
        </View>
        <View style={styles.postHeaderInfo}>
          <Text style={styles.postAuthor}>{item.autor_nombre}</Text>
          <Text style={styles.postTime}>{formatearTiempo(item.created_at)}</Text>
        </View>
        <View style={styles.postCategoryBadge}>
          <Text style={styles.postCategoryText}>{item.categoria}</Text>
        </View>
      </View>
      <Text style={styles.postContent}>{item.contenido}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(item.id)}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => toggleFavorito(item.id)}>
          <Text style={styles.actionIcon}>{favoritosMap[item.id] ? '⭐' : '☆'}</Text>
          <Text style={styles.actionText}>
            {favoritosMap[item.id] ? 'Guardado' : 'Guardar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.appName}>⚡ TechConnect</Text>
            {usuario && (
              <Text style={styles.greeting}>Hola, {usuario.nombre} 👋</Text>
            )}
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Explore', { usuarioId })}
            >
              <Text style={styles.iconText}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Favorites', { usuarioId })}
            >
              <Text style={styles.iconText}>⭐</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Profile', { usuarioId })}
            >
              <Text style={styles.iconText}>{usuario?.avatar || '👤'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings', { usuarioId })}
            >
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['Todas', ...CATEGORIAS]}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filtersList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setFiltroCategoria(item)}
              style={[
                styles.filterButton,
                filtroCategoria === item ? styles.filterButtonActive : styles.filterButtonInactive
              ]}
            >
              <Text style={[
                styles.filterText,
                filtroCategoria === item ? styles.filterTextActive : styles.filterTextInactive
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Lista de publicaciones */}
      <FlatList
        data={publicacionesFiltradas}
        renderItem={renderPublicacion}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refrescando} onRefresh={onRefresh} tintColor="#6366f1" />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No hay publicaciones</Text>
            <Text style={styles.emptySubtext}>¡Sé el primero en publicar!</Text>
          </View>
        }
      />

      {/* FAB - Nuevo Post */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal Nueva Publicación */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nueva Publicación</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder="¿Qué estás pensando? 💭"
              placeholderTextColor="#64748b"
              value={nuevoContenido}
              onChangeText={setNuevoContenido}
              multiline
              textAlignVertical="top"
            />
            <Text style={styles.modalLabel}>Categoría:</Text>
            <View style={styles.modalCategories}>
              {CATEGORIAS.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategoriaSeleccionada(cat)}
                  style={[
                    styles.modalCategoryBtn,
                    categoriaSeleccionada === cat ? styles.modalCategoryBtnActive : styles.modalCategoryBtnInactive
                  ]}
                >
                  <Text style={[
                    styles.modalCategoryText,
                    categoriaSeleccionada === cat ? styles.modalCategoryTextActive : styles.modalCategoryTextInactive
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalSubmit}
              onPress={handlePublicar}
              activeOpacity={0.8}
            >
              <Text style={styles.modalSubmitText}>Publicar 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { backgroundColor: '#0f172a', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  appName: { fontSize: 24, fontWeight: '800', color: '#fff' },
  greeting: { color: '#94a3b8', fontSize: 14, marginTop: 4 },
  headerIcons: { flexDirection: 'row' },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  iconText: { fontSize: 18 },
  filtersContainer: { paddingVertical: 12 },
  filtersList: { paddingHorizontal: 16 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  filterButtonActive: { backgroundColor: '#4f46e5' },
  filterButtonInactive: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  filterText: { fontSize: 14, fontWeight: '600' },
  filterTextActive: { color: '#fff' },
  filterTextInactive: { color: '#94a3b8' },
  postCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 20, marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1e293b' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  postAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4338ca', alignItems: 'center', justifyContent: 'center' },
  postAvatarText: { fontSize: 20 },
  postHeaderInfo: { marginLeft: 12, flex: 1 },
  postAuthor: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  postTime: { color: '#64748b', fontSize: 12 },
  postCategoryBadge: { backgroundColor: '#312e81', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  postCategoryText: { color: '#a5b4fc', fontSize: 12, fontWeight: '600' },
  postContent: { color: '#e2e8f0', fontSize: 16, lineHeight: 24, marginBottom: 16 },
  postActions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#1e293b', paddingTop: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionIcon: { fontSize: 18, marginRight: 4 },
  actionText: { color: '#94a3b8', fontSize: 14 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyText: { color: '#94a3b8', fontSize: 18 },
  emptySubtext: { color: '#64748b', fontSize: 14, marginTop: 4 },
  fab: { position: 'absolute', bottom: 24, right: 24, width: 64, height: 64, borderRadius: 32, backgroundColor: '#4f46e5', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8 },
  fabText: { color: '#fff', fontSize: 32, fontWeight: '300' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#0f172a', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, borderTopWidth: 1, borderTopColor: '#334155' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  modalClose: { color: '#94a3b8', fontSize: 24 },
  modalInput: { backgroundColor: '#1e293b', borderRadius: 16, padding: 16, color: '#fff', fontSize: 16, minHeight: 120, borderWidth: 1, borderColor: '#334155' },
  modalLabel: { color: '#94a3b8', fontSize: 14, marginTop: 12, marginBottom: 8 },
  modalCategories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  modalCategoryBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  modalCategoryBtnActive: { backgroundColor: '#4f46e5' },
  modalCategoryBtnInactive: { backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
  modalCategoryText: { fontSize: 14 },
  modalCategoryTextActive: { color: '#fff', fontWeight: 'bold' },
  modalCategoryTextInactive: { color: '#94a3b8' },
  modalSubmit: { backgroundColor: '#4f46e5', borderRadius: 16, paddingVertical: 16, alignItems: 'center' },
  modalSubmitText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
