import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppTheme } from '@/constants/app-theme';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.push({ pathname: '/pet/[id]', params: { id: post.petId } })}
          style={styles.authorRow}>
          <Image source={{ uri: post.petAvatar }} style={styles.avatar} />
          <View>
            <Text style={styles.petName}>{post.petName}</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
        </Pressable>
        <Ionicons name="ellipsis-horizontal" size={20} color={AppTheme.colors.textSecondary} />
      </View>

      <Pressable onPress={() => router.push({ pathname: '/post/[id]', params: { id: post.id } })}>
        <Image source={{ uri: post.image }} style={styles.image} />
      </Pressable>

      <View style={styles.body}>
        <View style={styles.actionsRow}>
          <View style={styles.leftActions}>
            <Pressable onPress={() => onLike?.(post.id)}>
              <Ionicons
                name={post.isLiked ? 'heart' : 'heart-outline'}
                size={25}
                color={post.isLiked ? AppTheme.colors.like : AppTheme.colors.textPrimary}
              />
            </Pressable>
            <Pressable onPress={() => router.push({ pathname: '/post/[id]', params: { id: post.id } })}>
              <Ionicons name="chatbubble-outline" size={24} color={AppTheme.colors.textPrimary} />
            </Pressable>
            <Ionicons name="paper-plane-outline" size={23} color={AppTheme.colors.textPrimary} />
          </View>
          <Ionicons name="bookmark-outline" size={23} color={AppTheme.colors.textPrimary} />
        </View>

        <Text style={styles.likes}>{post.likes.toLocaleString()} me gusta</Text>
        <Text style={styles.caption}>
          <Text style={styles.captionPet}>{post.petName} </Text>
          {post.caption}
        </Text>
        {post.comments > 0 && (
          <Pressable onPress={() => router.push({ pathname: '/post/[id]', params: { id: post.id } })}>
            <Text style={styles.commentsLink}>Ver los {post.comments} comentarios</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: AppTheme.colors.card,
    marginBottom: 14,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: AppTheme.radius.full,
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
  },
  petName: {
    fontSize: 15,
    fontWeight: '700',
    color: AppTheme.colors.textPrimary,
  },
  timestamp: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#D8D8D8',
  },
  body: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  likes: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '700',
    color: AppTheme.colors.textPrimary,
  },
  caption: {
    marginTop: 6,
    color: AppTheme.colors.textPrimary,
    lineHeight: 20,
  },
  captionPet: {
    fontWeight: '700',
  },
  commentsLink: {
    marginTop: 8,
    color: AppTheme.colors.textSecondary,
    fontSize: 13,
  },
});
