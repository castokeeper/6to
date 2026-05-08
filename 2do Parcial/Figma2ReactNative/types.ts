export type PetSpecies = 'dog' | 'cat';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: number;
  avatar: string;
  owner: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Story {
  id: string;
  petId: string;
  petName: string;
  petAvatar: string;
  hasNew: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Post {
  id: string;
  petId: string;
  petName: string;
  petAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
  location?: string;
}

export interface PostComment {
  id: string;
  postId: string;
  petId: string;
  petName: string;
  petAvatar: string;
  text: string;
  timestamp: string;
}

export type NotificationType = 'like' | 'follow' | 'comment';

export interface AppNotification {
  id: string;
  type: NotificationType;
  petId: string;
  petName: string;
  petAvatar: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatPreview {
  id: string;
  petId: string;
  petName: string;
  petAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface CreatePostInput {
  caption: string;
  image?: string;
  location?: string;
}
