import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Post } from "../../mobile-data/mockData";
import { Link } from "react-router";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

// COMPONENTE REUTILIZABLE: PostCard (Requerimiento: Componentes)
interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
}

export function PostCard({ post, onLike }: PostCardProps) {
  return (
    <div className="bg-white mb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link to={`/app/pet/${post.petId}`} className="flex items-center gap-3">
          <img 
            src={post.petAvatar} 
            alt={post.petName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[var(--primary-color)]"
          />
          <div>
            <p className="font-semibold text-[var(--text-primary)]">{post.petName}</p>
            <p className="text-xs text-[var(--text-secondary)]">{post.timestamp}</p>
          </div>
        </Link>
        <button className="text-[var(--text-secondary)]">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="4" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
      </div>

      {/* Image */}
      <Link to={`/app/post/${post.id}`}>
        <ImageWithFallback 
          src={post.image}
          alt={post.caption}
          className="w-full aspect-square object-cover"
        />
      </Link>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => onLike?.(post.id)}
              className="flex items-center gap-1"
            >
              <Heart 
                size={24} 
                className={post.isLiked ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-[var(--text-primary)]"}
              />
            </motion.button>
            <Link to={`/app/post/${post.id}`}>
              <MessageCircle size={24} className="text-[var(--text-primary)]" />
            </Link>
            <Share2 size={24} className="text-[var(--text-primary)]" />
          </div>
          <Bookmark size={24} className="text-[var(--text-primary)]" />
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm text-[var(--text-primary)] mb-2">
          {post.likes.toLocaleString()} me gusta
        </p>

        {/* Caption */}
        <p className="text-sm text-[var(--text-primary)]">
          <Link to={`/app/pet/${post.petId}`} className="font-semibold mr-2">{post.petName}</Link>
          {post.caption}
        </p>

        {/* Comments */}
        {post.comments > 0 && (
          <Link to={`/app/post/${post.id}`}>
            <p className="text-sm text-[var(--text-secondary)] mt-2">
              Ver los {post.comments} comentarios
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
