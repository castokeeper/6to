import { useState } from "react";
import { motion } from "motion/react";
import { categories, posts } from "../mobile-data/mockData";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// PANTALLA 4: Explore con categorías horizontales
export function Explore() {
  const [selectedCategory, setSelectedCategory] = useState("c1");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-4">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Explorar</h1>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <Link to="/app/search">
          <div className="bg-gray-100 rounded-full px-4 py-3 flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <span className="text-[var(--text-secondary)]">Buscar mascotas...</span>
          </div>
        </Link>
      </div>

      {/* Categories - Horizontal Scroll con Auto Layout */}
      <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-[var(--primary-color)] text-white shadow-md"
                  : "bg-gray-100 text-[var(--text-primary)]"
              }`}
              style={selectedCategory === category.id ? { backgroundColor: category.color } : {}}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Grid de Posts */}
      <div className="px-2 py-4">
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post, idx) => (
            <Link key={post.id} to={`/app/post/${post.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="aspect-square bg-gray-100 overflow-hidden"
              >
                <ImageWithFallback
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
