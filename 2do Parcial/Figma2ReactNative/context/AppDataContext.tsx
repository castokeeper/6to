import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';

import { chats, comments, currentUser, notifications, pets, posts, stories, categories } from '@/data/mockData';
import { AppNotification, Category, ChatPreview, CreatePostInput, Pet, Post, PostComment, Story } from '@/types';

interface AppDataContextValue {
  isAuthenticated: boolean;
  currentUser: Pet;
  pets: Pet[];
  stories: Story[];
  categories: Category[];
  posts: Post[];
  notifications: AppNotification[];
  chats: ChatPreview[];
  login: (email: string, password: string) => void;
  logout: () => void;
  toggleLike: (postId: string) => void;
  createPost: (input: CreatePostInput) => string;
  addComment: (postId: string, text: string) => void;
  getPostById: (postId: string) => Post | undefined;
  getPetById: (petId: string) => Pet | undefined;
  getCommentsByPost: (postId: string) => PostComment[];
  markNotificationAsRead: (notificationId: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

interface AppDataProviderProps {
  children: ReactNode;
}

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<Pet>({ ...currentUser });
  const [feedPosts, setFeedPosts] = useState<Post[]>(posts.map((post) => ({ ...post })));
  const [feedNotifications, setFeedNotifications] = useState<AppNotification[]>(
    notifications.map((notification) => ({ ...notification }))
  );
  const [postComments, setPostComments] = useState<PostComment[]>(comments.map((comment) => ({ ...comment })));

  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const toggleLike = useCallback((postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? Math.max(post.likes - 1, 0) : post.likes + 1,
            }
          : post
      )
    );
  }, []);

  const createPost = useCallback(
    (input: CreatePostInput) => {
      const postId = `p-${Date.now()}`;
      const newPost: Post = {
        id: postId,
        petId: user.id,
        petName: user.name,
        petAvatar: user.avatar,
        image:
          input.image ??
          'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
        caption: input.caption.trim() || 'Nueva publicación 🐾',
        likes: 0,
        comments: 0,
        timestamp: 'Ahora',
        isLiked: false,
        location: input.location,
      };

      setFeedPosts((prev) => [newPost, ...prev]);
      setUser((prev) => ({ ...prev, posts: prev.posts + 1 }));

      return postId;
    },
    [user]
  );

  const addComment = useCallback(
    (postId: string, text: string) => {
      const value = text.trim();
      if (!value) {
        return;
      }

      const comment: PostComment = {
        id: `c-${Date.now()}`,
        postId,
        petId: user.id,
        petName: user.name,
        petAvatar: user.avatar,
        text: value,
        timestamp: 'Ahora',
      };

      setPostComments((prev) => [comment, ...prev]);
      setFeedPosts((prev) =>
        prev.map((post) => (post.id === postId ? { ...post, comments: post.comments + 1 } : post))
      );
    },
    [user]
  );

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setFeedNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );
  }, []);

  const getPostById = useCallback(
    (postId: string) => feedPosts.find((post) => post.id === postId),
    [feedPosts]
  );

  const getPetById = useCallback(
    (petId: string) => {
      if (petId === user.id) {
        return user;
      }
      return pets.find((pet) => pet.id === petId);
    },
    [user]
  );

  const getCommentsByPost = useCallback(
    (postId: string) => postComments.filter((comment) => comment.postId === postId),
    [postComments]
  );

  const value = useMemo<AppDataContextValue>(
    () => ({
      isAuthenticated,
      currentUser: user,
      pets,
      stories,
      categories,
      posts: feedPosts,
      notifications: feedNotifications,
      chats,
      login,
      logout,
      toggleLike,
      createPost,
      addComment,
      getPostById,
      getPetById,
      getCommentsByPost,
      markNotificationAsRead,
    }),
    [
      addComment,
      createPost,
      feedNotifications,
      feedPosts,
      getCommentsByPost,
      getPetById,
      getPostById,
      isAuthenticated,
      login,
      logout,
      markNotificationAsRead,
      toggleLike,
      user,
    ]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData debe usarse dentro de AppDataProvider');
  }
  return context;
}
