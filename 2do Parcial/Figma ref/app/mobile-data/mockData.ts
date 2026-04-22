// Mock data para Pawsome - Red Social de Mascotas

export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat";
  breed: string;
  age: number;
  avatar: string;
  owner: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
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
}

export interface Story {
  id: string;
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

export const currentUser: Pet = {
  id: "user-1",
  name: "Max",
  species: "dog",
  breed: "Golden Retriever",
  age: 3,
  avatar: "https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  owner: "María García",
  bio: "🐕 Amante de las pelotas y los abrazos • Aventurero de parques • Mejor amigo de todos",
  followers: 1245,
  following: 892,
  posts: 156
};

export const pets: Pet[] = [
  {
    id: "2",
    name: "Luna",
    species: "cat",
    breed: "Siamés",
    age: 2,
    avatar: "https://images.unsplash.com/photo-1743560769534-1f8abb6acb9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    owner: "Carlos Ruiz",
    bio: "Reina del hogar 👑",
    followers: 892,
    following: 234,
    posts: 89
  },
  {
    id: "3",
    name: "Rocky",
    species: "dog",
    breed: "Corgi",
    age: 1,
    avatar: "https://images.unsplash.com/photo-1654995159231-91401633f72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    owner: "Ana López",
    bio: "Pequeño pero poderoso 💪",
    followers: 2341,
    following: 567,
    posts: 234
  },
  {
    id: "4",
    name: "Milo",
    species: "cat",
    breed: "Persa",
    age: 4,
    avatar: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    owner: "Pedro Sánchez",
    bio: "Elegante y sofisticado",
    followers: 678,
    following: 123,
    posts: 45
  },
  {
    id: "5",
    name: "Bella",
    species: "dog",
    breed: "Labrador",
    age: 5,
    avatar: "https://images.unsplash.com/photo-1667516837506-c13f487e58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    owner: "Laura Martínez",
    bio: "Nadadora profesional 🏊‍♀️",
    followers: 3456,
    following: 890,
    posts: 567
  }
];

export const stories: Story[] = [
  { id: "s1", petName: "Max", petAvatar: currentUser.avatar, hasNew: false },
  { id: "s2", petName: "Luna", petAvatar: pets[0].avatar, hasNew: true },
  { id: "s3", petName: "Rocky", petAvatar: pets[1].avatar, hasNew: true },
  { id: "s4", petName: "Milo", petAvatar: pets[2].avatar, hasNew: false },
  { id: "s5", petName: "Bella", petAvatar: pets[3].avatar, hasNew: true },
];

export const posts: Post[] = [
  {
    id: "p1",
    petId: "2",
    petName: "Luna",
    petAvatar: pets[0].avatar,
    image: "https://images.unsplash.com/photo-1743560769534-1f8abb6acb9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Disfrutando del sol de la tarde ☀️ #CatLife",
    likes: 234,
    comments: 45,
    timestamp: "Hace 2 horas",
    isLiked: false
  },
  {
    id: "p2",
    petId: "3",
    petName: "Rocky",
    petAvatar: pets[1].avatar,
    image: "https://images.unsplash.com/photo-1654995159231-91401633f72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "¡Día en el parque! 🌳 Me encanta correr por el césped",
    likes: 567,
    comments: 89,
    timestamp: "Hace 5 horas",
    isLiked: true
  },
  {
    id: "p3",
    petId: "5",
    petName: "Bella",
    petAvatar: pets[3].avatar,
    image: "https://images.unsplash.com/photo-1667516837506-c13f487e58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Primera vez en la playa 🌊 ¡Qué felicidad!",
    likes: 892,
    comments: 156,
    timestamp: "Hace 1 día",
    isLiked: true
  },
  {
    id: "p4",
    petId: "4",
    petName: "Milo",
    petAvatar: pets[2].avatar,
    image: "https://images.unsplash.com/photo-1735618603118-89e26b0dcf6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Siesta de la tarde... no molestar 😴",
    likes: 445,
    comments: 67,
    timestamp: "Hace 2 días",
    isLiked: false
  },
  {
    id: "p5",
    petId: "user-1",
    petName: "Max",
    petAvatar: currentUser.avatar,
    image: "https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "¡Nueva pelota! Es mi día favorito 🎾",
    likes: 678,
    comments: 92,
    timestamp: "Hace 3 días",
    isLiked: false
  },
  {
    id: "p6",
    petId: "3",
    petName: "Rocky",
    petAvatar: pets[1].avatar,
    image: "https://images.unsplash.com/photo-1760204473280-6d04fb55b5e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    caption: "Jugando con mi hermano cachorro 🐾",
    likes: 1234,
    comments: 234,
    timestamp: "Hace 4 días",
    isLiked: true
  }
];

export const categories: Category[] = [
  { id: "c1", name: "Todos", icon: "🐾", color: "#FF6B6B" },
  { id: "c2", name: "Perros", icon: "🐕", color: "#4ECDC4" },
  { id: "c3", name: "Gatos", icon: "🐱", color: "#FFE66D" },
  { id: "c4", name: "Cachorros", icon: "🐶", color: "#95E1D3" },
  { id: "c5", name: "Aventuras", icon: "🏔️", color: "#F38181" },
  { id: "c6", name: "Comida", icon: "🍖", color: "#AA96DA" },
];

export const notifications = [
  {
    id: "n1",
    type: "like",
    petName: "Luna",
    petAvatar: pets[0].avatar,
    message: "le gustó tu publicación",
    timestamp: "Hace 5 min",
    read: false
  },
  {
    id: "n2",
    type: "follow",
    petName: "Rocky",
    petAvatar: pets[1].avatar,
    message: "comenzó a seguirte",
    timestamp: "Hace 1 hora",
    read: false
  },
  {
    id: "n3",
    type: "comment",
    petName: "Bella",
    petAvatar: pets[3].avatar,
    message: "comentó: '¡Qué lindo! 🐾'",
    timestamp: "Hace 2 horas",
    read: true
  },
  {
    id: "n4",
    type: "like",
    petName: "Milo",
    petAvatar: pets[2].avatar,
    message: "le gustó tu publicación",
    timestamp: "Hace 3 horas",
    read: true
  }
];
