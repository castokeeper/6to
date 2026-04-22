import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Heart, MessageCircle, Send } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { posts } from "../mobile-data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// PANTALLA 8: Post Detail con SMART ANIMATE (Requerimiento: Smart Animate)
export function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes || 0);

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const mockComments = [
    { id: 1, user: "Bella", avatar: "https://images.unsplash.com/photo-1667516837506-c13f487e58bf?w=100", text: "¡Qué lindo! 🐾", time: "Hace 1h" },
    { id: 2, user: "Rocky", avatar: "https://images.unsplash.com/photo-1654995159231-91401633f72e?w=100", text: "Me encanta!", time: "Hace 2h" },
    { id: 3, user: "Luna", avatar: "https://images.unsplash.com/photo-1743560769534-1f8abb6acb9a?w=100", text: "Hermoso día 😍", time: "Hace 3h" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-[var(--text-primary)]" />
          </button>
          <img 
            src={post.petAvatar} 
            alt={post.petName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <Link to={`/app/pet/${post.petId}`}>
            <span className="font-semibold text-[var(--text-primary)]">{post.petName}</span>
          </Link>
        </div>
      </div>

      {/* Image con Smart Animate */}
      <motion.div
        layoutId={`post-image-${post.id}`}
        className="w-full aspect-square bg-gray-100"
      >
        <ImageWithFallback
          src={post.image}
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Actions */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleLike}
            >
              <Heart 
                size={28} 
                className={isLiked ? "fill-[var(--accent-color)] text-[var(--accent-color)]" : "text-[var(--text-primary)]"}
              />
            </motion.button>
            <MessageCircle size={28} className="text-[var(--text-primary)]" />
            <Send size={28} className="text-[var(--text-primary)]" />
          </div>
        </div>

        <p className="font-semibold text-sm text-[var(--text-primary)] mb-2">
          {likes.toLocaleString()} me gusta
        </p>

        <p className="text-sm text-[var(--text-primary)] mb-1">
          <Link to={`/app/pet/${post.petId}`} className="font-semibold mr-2">{post.petName}</Link>
          {post.caption}
        </p>

        <p className="text-xs text-[var(--text-secondary)] uppercase">
          {post.timestamp}
        </p>
      </div>

      {/* Comments */}
      <div className="px-4 py-3">
        <h3 className="font-semibold text-[var(--text-primary)] mb-4">Comentarios</h3>
        <div className="space-y-4">
          {mockComments.map((comment, idx) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-3"
            >
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold text-[var(--text-primary)]">{comment.user}</span>{" "}
                  <span className="text-[var(--text-primary)]">{comment.text}</span>
                </p>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{comment.time}</p>
              </div>
              <Heart size={16} className="text-[var(--text-secondary)] flex-shrink-0 mt-1" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comment Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-[390px] mx-auto flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?w=100"
            alt="You"
            className="w-8 h-8 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Añade un comentario..."
            className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
          <button className="text-[var(--primary-color)] font-semibold text-sm">
            Publicar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
