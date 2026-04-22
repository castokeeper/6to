import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Post, Comentario } from '@/types';
import TarjetaPost from '@/components/TarjetaPost';

export default function DetalleScreen() {
  const params = useLocalSearchParams<{ post: string }>();
  const post: Post = JSON.parse(params.post ?? '{}');

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ title: post.petName ?? 'Detalle' });
  }, [navigation, post.petName]);

  const [liked, setLiked] = useState<boolean>(post.isLiked ?? false);
  const [likes, setLikes] = useState<number>(post.likes ?? 0);
  const [comentario, setComentario] = useState<string>('');
  const [comentarios, setComentarios] = useState<Comentario[]>([
    { id: 'c1', autor: 'Bella 🐕', texto: '¡Qué lindo! 🐾', tiempo: 'Hace 1h' },
    { id: 'c2', autor: 'Rocky 🐶', texto: 'Me encanta!', tiempo: 'Hace 2h' },
    { id: 'c3', autor: 'Luna 🐱', texto: 'Hermoso día 😍', tiempo: 'Hace 3h' },
  ]);

  const handleLike = (): void => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleEnviarComentario = (): void => {
    if (!comentario.trim()) {
      Alert.alert('Oops', 'Escribe algo antes de comentar 🐾');
      return;
    }
    const nuevo: Comentario = {
      id: `c${Date.now()}`,
      autor: 'Max (Tú) 🐕',
      texto: comentario.trim(),
      tiempo: 'Ahora',
    };
    setComentarios([nuevo, ...comentarios]);
    setComentario('');
    Alert.alert('¡Listo!', 'Tu comentario fue publicado 🎉');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: post.imagen }} style={styles.imagen} resizeMode="cover" />

        <View style={styles.infoContainer}>
          <View style={styles.petHeader}>
            <View style={styles.petAvatarPlaceholder}>
              <Text style={styles.petAvatarEmoji}>
                {post.especie?.startsWith('🐱') ? '🐱' : '🐕'}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.petName}>{post.petName}</Text>
              <Text style={styles.petEspecie}>{post.especie}</Text>
            </View>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>

          <Text style={styles.descripcion}>{post.descripcion}</Text>

          <View style={styles.acciones}>
            <TouchableOpacity style={styles.botonAccion} onPress={handleLike}>
              <Text style={styles.iconoAccion}>{liked ? '❤️' : '🤍'}</Text>
              <Text style={[styles.textoAccion, liked && styles.likedText]}>
                {likes.toLocaleString()} me gusta
              </Text>
            </TouchableOpacity>
            <View style={styles.botonAccion}>
              <Text style={styles.iconoAccion}>💬</Text>
              <Text style={styles.textoAccion}>{comentarios.length} comentarios</Text>
            </View>
          </View>

          <Text style={styles.seccionTitulo}>Vista previa</Text>
          <TarjetaPost post={post} compact />
        </View>

        <View style={styles.comentariosSection}>
          <Text style={styles.seccionTitulo}>Comentarios</Text>
          {comentarios.map((c) => (
            <View key={c.id} style={styles.comentarioItem}>
              <Text style={styles.comentarioAutor}>{c.autor}</Text>
              <Text style={styles.comentarioTexto}>{c.texto}</Text>
              <Text style={styles.comentarioTiempo}>{c.tiempo}</Text>
            </View>
          ))}
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.seccionTitulo}>Deja un comentario</Text>
          <TextInput
            style={styles.comentarioInput}
            placeholder="Escribe tu comentario... 🐾"
            placeholderTextColor="#95A5A6"
            value={comentario}
            onChangeText={setComentario}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity style={styles.btnPublicar} onPress={handleEnviarComentario}>
            <Text style={styles.btnPublicarTexto}>Publicar comentario 🐾</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  imagen: {
    width: '100%',
    height: 300,
    backgroundColor: '#E0E0E0',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  petHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  petAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE66D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  petAvatarEmoji: {
    fontSize: 22,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  petEspecie: {
    fontSize: 12,
    color: '#95A5A6',
  },
  timestamp: {
    fontSize: 11,
    color: '#95A5A6',
  },
  descripcion: {
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 22,
    marginBottom: 16,
  },
  acciones: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 16,
  },
  botonAccion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconoAccion: {
    fontSize: 20,
  },
  textoAccion: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
  },
  likedText: {
    color: '#FF6B6B',
  },
  seccionTitulo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  comentariosSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 8,
  },
  comentarioItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  comentarioAutor: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 2,
  },
  comentarioTexto: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 2,
  },
  comentarioTiempo: {
    fontSize: 11,
    color: '#95A5A6',
  },
  inputSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 32,
  },
  comentarioInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  btnPublicar: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPublicarTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
