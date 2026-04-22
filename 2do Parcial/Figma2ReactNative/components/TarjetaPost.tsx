import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Post } from '@/types';

interface TarjetaPostProps {
  post: Post;
  onPress?: () => void;
  compact?: boolean;
}

export default function TarjetaPost({ post, onPress, compact = false }: TarjetaPostProps) {
  if (compact) {
    return (
      <View style={styles.compactCard}>
        <Image source={{ uri: post.imagen }} style={styles.compactImagen} />
        <View style={styles.compactInfo}>
          <Text style={styles.compactPetName}>{post.petName}</Text>
          <Text style={styles.compactEspecie}>{post.especie}</Text>
          <Text style={styles.compactDesc} numberOfLines={2}>
            {post.descripcion}
          </Text>
          <View style={styles.compactStats}>
            <Text style={styles.statText}>❤️ {post.likes}</Text>
            <Text style={styles.statText}>💬 {post.comentarios}</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.93}>
      <Image source={{ uri: post.imagen }} style={styles.imagen} resizeMode="cover" />
      <View style={styles.cardBody}>
        <View style={styles.header}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>
              {post.especie.startsWith('🐱') ? '🐱' : '🐕'}
            </Text>
          </View>
          <View style={styles.headerTextos}>
            <Text style={styles.petName}>{post.petName}</Text>
            <Text style={styles.especie}>{post.especie}</Text>
          </View>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>

        <Text style={styles.descripcion} numberOfLines={2}>
          {post.descripcion}
        </Text>

        <View style={styles.footer}>
          <View style={styles.stats}>
            <Text style={styles.statText}>❤️ {post.likes.toLocaleString()}</Text>
            <Text style={styles.statText}>💬 {post.comentarios}</Text>
          </View>
          <Text style={styles.verMas}>Ver más →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imagen: {
    width: '100%',
    height: 200,
    backgroundColor: '#E8E8E8',
  },
  cardBody: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE66D',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  avatarEmoji: {
    fontSize: 18,
  },
  headerTextos: {
    flex: 1,
  },
  petName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  especie: {
    fontSize: 12,
    color: '#95A5A6',
  },
  timestamp: {
    fontSize: 11,
    color: '#95A5A6',
  },
  descripcion: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#F0F0F0',
  },
  stats: {
    flexDirection: 'row',
    gap: 14,
  },
  statText: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
  },
  verMas: {
    fontSize: 13,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
  compactCard: {
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  compactImagen: {
    width: 80,
    height: 80,
    backgroundColor: '#E8E8E8',
  },
  compactInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    gap: 2,
  },
  compactPetName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  compactEspecie: {
    fontSize: 11,
    color: '#4ECDC4',
    fontWeight: '600',
  },
  compactDesc: {
    fontSize: 12,
    color: '#95A5A6',
    lineHeight: 16,
    marginTop: 2,
  },
  compactStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
});
