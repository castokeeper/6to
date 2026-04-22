// types.ts — Tipos compartidos entre pantallas y componentes
export interface Post {
  id: string;
  petName: string;
  especie: string;
  descripcion: string;
  likes: number;
  comentarios: number;
  timestamp: string;
  imagen: string;
  isLiked: boolean;
}

export interface Comentario {
  id: string;
  autor: string;
  texto: string;
  tiempo: string;
}
