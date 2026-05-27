import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { obtenerPublicaciones, darLike, agregarFavorito, eliminarFavorito, esFavorito } from '../database/database';

const CATEGORIAS_INFO = [
  { nombre: 'Desarrollo', icono: '💻', bgColor: 'rgba(30, 58, 138, 0.4)', textColor: '#93c5fd' },
  { nombre: 'Tips', icono: '💡', bgColor: 'rgba(120, 53, 15, 0.4)', textColor: '#fcd34d' },
  { nombre: 'Herramientas', icono: '🔧', bgColor: 'rgba(6, 78, 59, 0.4)', textColor: '#6ee7b7' },
  { nombre: 'Noticias', icono: '📰', bgColor: 'rgba(88, 28, 135, 0.4)', textColor: '#d8b4fe' },
  { nombre: 'Comunidad', icono: '🤝', bgColor: 'rgba(131, 24, 67, 0.4)', textColor: '#f9a8d4' },
  { nombre: 'General', icono: '📌', bgColor: '#334155', textColor: '#cbd5e1' },
];

export default function ExploreScreen({ route, navigation }) {
  const { usuarioId } = route.params;
  const [busqueda, setBusqueda] = useState('');
  const [publicaciones, setPublicaciones] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [favoritosMap, setFavoritosMap] = useState({});

  const cargarDatos = async () => {
    try {
      const pubs = await obtenerPublicaciones();
      setPublicaciones(pubs);
      const favMap = {};
      for (const pub of pubs) {
        favMap[pub.id] = await esFavorito(usuarioId, pub.id);
      }
      setFavoritosMap(favMap);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(useCallback(() => { cargarDatos(); }, []));

  const handleLike = async (pubId) => {
    await darLike(pubId);
    await cargarDatos();
  };

  const toggleFav = async (pubId) => {
    if (favoritosMap[pubId]) {
      await eliminarFavorito(usuarioId, pubId);
    } else {
      await agregarFavorito(usuarioId, pubId);
    }
    setFavoritosMap(prev => ({ ...prev, [pubId]: !prev[pubId] }));
  };

  const resultados = publicaciones.filter((p) => {
    const matchBusqueda = !busqueda.trim() ||
      p.contenido.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.autor_nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchCategoria = !categoriaActiva || p.categoria === categoriaActiva;
    return matchBusqueda && matchCategoria;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>🔍 Explorar</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar publicaciones o usuarios..."
          placeholderTextColor="#64748b"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesLabel}>Categorías</Text>
        <View style={styles.categoriesList}>
          {CATEGORIAS_INFO.map((cat) => (
            <TouchableOpacity
              key={cat.nombre}
              onPress={() => setCategoriaActiva(categoriaActiva === cat.nombre ? null : cat.nombre)}
              style={[
                styles.categoryButton,
                categoriaActiva === cat.nombre ? styles.categoryButtonActive : { backgroundColor: cat.bgColor }
              ]}
            >
              <Text style={styles.categoryIcon}>{cat.icono}</Text>
              <Text style={[
                styles.categoryText,
                categoriaActiva === cat.nombre ? styles.categoryTextActive : { color: cat.textColor }
              ]}>
                {cat.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.resultsList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultsCount}>
            {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔎</Text>
            <Text style={styles.emptyText}>No se encontraron resultados</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.postAvatar}>
                <Text style={styles.postAvatarText}>{item.autor_avatar || '👤'}</Text>
              </View>
              <View style={styles.postHeaderInfo}>
                <Text style={styles.postAuthor}>{item.autor_nombre}</Text>
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
              <TouchableOpacity style={styles.actionButton} onPress={() => toggleFav(item.id)}>
                <Text style={styles.actionIcon}>{favoritosMap[item.id] ? '⭐' : '☆'}</Text>
                <Text style={styles.actionText}>
                  {favoritosMap[item.id] ? 'Guardado' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617' },
  header: { backgroundColor: '#0f172a', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1e293b', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#334155', marginRight: 12 },
  backButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  searchInput: { backgroundColor: '#1e293b', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 12, color: '#fff', borderWidth: 1, borderColor: '#334155' },
  categoriesContainer: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  categoriesLabel: { color: '#64748b', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  categoriesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, marginBottom: 8, marginRight: 8 },
  categoryButtonActive: { backgroundColor: '#4f46e5' },
  categoryIcon: { marginRight: 4 },
  categoryText: { fontSize: 14, fontWeight: '600' },
  categoryTextActive: { color: '#fff' },
  resultsList: { paddingBottom: 20 },
  resultsCount: { color: '#94a3b8', fontSize: 14, paddingHorizontal: 20, paddingVertical: 8 },
  emptyContainer: { alignItems: 'center', paddingVertical: 64 },
  emptyIcon: { fontSize: 36, marginBottom: 12 },
  emptyText: { color: '#94a3b8', fontSize: 18 },
  postCard: { backgroundColor: '#0f172a', borderRadius: 16, padding: 20, marginHorizontal: 16, marginBottom: 12, borderWidth: 1, borderColor: '#1e293b' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#4338ca', alignItems: 'center', justifyContent: 'center' },
  postAvatarText: { fontSize: 18 },
  postHeaderInfo: { marginLeft: 12, flex: 1 },
  postAuthor: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  postCategoryBadge: { backgroundColor: '#312e81', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  postCategoryText: { color: '#a5b4fc', fontSize: 12, fontWeight: '600' },
  postContent: { color: '#e2e8f0', fontSize: 16, lineHeight: 24, marginBottom: 12 },
  postActions: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#1e293b', paddingTop: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginRight: 24 },
  actionIcon: { fontSize: 18, marginRight: 4 },
  actionText: { color: '#94a3b8', fontSize: 14 }
});
