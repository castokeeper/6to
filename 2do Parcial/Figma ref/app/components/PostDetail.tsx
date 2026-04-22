import { useState } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Heart, Share2, Bookmark, MapPin } from "lucide-react";
import { mockPosts } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PostDetail() {
  const { id } = useParams();
  const post = mockPosts.find(p => p.id === id);
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-400">Post not found</p>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pb-20"
    >
      {/* Header */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm tracking-wide">Back to feed</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Hero Image with Hotspots */}
        <div className="relative w-full" style={{ height: "60vh" }}>
          <ImageWithFallback
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />

          {/* Hotspot Markers */}
          {post.hotspots.map((hotspot) => (
            <motion.button
              key={hotspot.id}
              className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => setSelectedHotspot(hotspot.id === selectedHotspot ? null : hotspot.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-full border-2 border-neutral-900 flex items-center justify-center">
                <MapPin size={14} className="text-neutral-900" />
              </div>
              
              {/* Hotspot Info Card */}
              <AnimatePresence>
                {selectedHotspot === hotspot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 w-64 z-10"
                  >
                    <h4 className="font-serif text-sm mb-1">{hotspot.item}</h4>
                    <p className="text-xs text-neutral-500 mb-2">{hotspot.source}</p>
                    {hotspot.price && (
                      <p className="text-xs font-medium text-neutral-900">{hotspot.price}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          {/* Like Button */}
          <motion.button
            onClick={handleLike}
            className="absolute bottom-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={24}
              className={isLiked ? "fill-red-500 text-red-500" : "text-neutral-600"}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 py-12">
          {/* Title & Author */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-neutral-900">
              {post.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center text-sm font-medium">
                  {post.author.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{post.author.name}</p>
                  <p className="text-xs text-neutral-400 tracking-wide uppercase">{post.createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={18} className={isLiked ? "fill-red-500 text-red-500" : "text-neutral-400"} />
                <span className="text-sm text-neutral-600">{likes} likes</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg leading-relaxed text-neutral-700 mb-12 max-w-3xl">
            {post.description}
          </p>

          {/* Tags */}
          <div className="mb-12">
            <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-neutral-50 text-neutral-700 text-sm tracking-wide rounded-full border border-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Material Palette */}
          <div>
            <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-4">Material Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {post.materials.map((material, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
                >
                  <p className="text-sm text-neutral-700 tracking-wide">{material}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sources Section */}
          {post.hotspots.length > 0 && (
            <div className="mt-12 pt-12 border-t border-neutral-200">
              <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-6">Featured Items</h3>
              <div className="space-y-4">
                {post.hotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
                  >
                    <div>
                      <h4 className="font-serif text-sm mb-1">{hotspot.item}</h4>
                      <p className="text-xs text-neutral-500">{hotspot.source}</p>
                    </div>
                    {hotspot.price && (
                      <p className="text-sm font-medium text-neutral-900">{hotspot.price}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
