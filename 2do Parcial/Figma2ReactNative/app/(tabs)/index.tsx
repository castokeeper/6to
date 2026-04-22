import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ListRenderItemInfo,
} from 'react-native';
import { router } from 'expo-router';
import { Post } from '@/types';
import TarjetaPost from '@/components/TarjetaPost';

const POSTS: Post[] = [
  {
    id: 'p1',
    petName: 'Luna',
    especie: '🐱 Gato · Siamés',
    descripcion: 'Disfrutando del sol de la tarde ☀️ #CatLife',
    likes: 234,
    comentarios: 45,
    timestamp: 'Hace 2 horas',
    imagen: 'https://images.unsplash.com/photo-1743560769534-1f8abb6acb9a?w=400',
    isLiked: false,
  },
  {
    id: 'p2',
    petName: 'Rocky',
    especie: '🐕 Perro · Corgi',
    descripcion: '¡Día en el parque! 🌳 Me encanta correr por el césped',
    likes: 567,
    comentarios: 89,
    timestamp: 'Hace 5 horas',
    imagen: 'https://images.unsplash.com/photo-1654995159231-91401633f72e?w=400',
    isLiked: true,
  },
  {
    id: 'p3',
    petName: 'Bella',
    especie: '🐕 Perro · Labrador',
    descripcion: 'Primera vez en la playa 🌊 ¡Qué felicidad!',
    likes: 892,
    comentarios: 156,
    timestamp: 'Hace 1 día',
    imagen: 'https://images.unsplash.com/photo-1667516837506-c13f487e58bf?w=400',
    isLiked: true,
  },
  {
    id: 'p4',
    petName: 'Milo',
    especie: '🐱 Gato · Persa',
    descripcion: 'Siesta de la tarde... no molestar 😴',
    likes: 445,
    comentarios: 67,
    timestamp: 'Hace 2 días',
    imagen: 'https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?w=400',
    isLiked: false,
  },
  {
    id: 'p5',
    petName: 'Max',
    especie: '🐕 Perro · Golden Retriever',
    descripcion: '¡Nueva pelota! Es mi día favorito 🎾',
    likes: 678,
    comentarios: 92,
    timestamp: 'Hace 3 días',
    imagen: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?w=400',
    isLiked: false,
  },
  {
    id: 'p6',
    petName: 'Rocky',
    especie: '🐕 Perro · Corgi',
    descripcion: 'Jugando con mi hermano cachorro 🐾',
    likes: 1234,
    comentarios: 234,
    timestamp: 'Hace 4 días',
    imagen: 'https://images.unsplash.com/photo-1760204473280-6d04fb55b5e2?w=400',
    isLiked: true,
  },
];

export default function FeedScreen() {
  const [filtro, setFiltro] = useState<string>('');

  const postsFiltrados = useMemo<Post[]>(
    () =>
      POSTS.filter(
        (p) =>
          p.petName.toLowerCase().includes(filtro.toLowerCase()) ||
          p.descripcion.toLowerCase().includes(filtro.toLowerCase())
      ),
    [filtro]
  );

  const handlePressTarjeta = (post: Post): void => {
    router.push({
      pathname: '/detalle',
      params: { post: JSON.stringify(post) },
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<Post>) => (
    <TarjetaPost post={item} onPress={() => handlePressTarjeta(item)} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>🐾 Pawsome</Text>
        <Text style={styles.headerSub}>Red Social para Mascotas</Text>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Busca mascotas o publicaciones..."
          placeholderTextColor="#95A5A6"
          value={filtro}
          onChangeText={setFiltro}
          clearButtonMode="while-editing"
        />
      </View>

      <Text style={styles.contador}>
        {postsFiltrados.length}{' '}
        {postsFiltrados.length === 1 ? 'publicación' : 'publicaciones'}
      </Text>

      <FlatList<Post>
        data={postsFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🐾</Text>
            <Text style={styles.emptyText}>No hay resultados para "{filtro}"</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  headerBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  headerSub: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C3E50',
  },
  contador: {
    fontSize: 12,
    color: '#95A5A6',
    marginHorizontal: 20,
    marginBottom: 8,
    marginTop: 4,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#95A5A6',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
