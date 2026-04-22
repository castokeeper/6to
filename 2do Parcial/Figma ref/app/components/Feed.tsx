import { useState } from "react";
import { Link } from "react-router";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { mockPosts } from "../data/mockData";
import { FilterBar } from "./FilterBar";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Feed() {
  const [selectedCategory, setSelectedCategory] = useState("all spaces");
  const [posts, setPosts] = useState(mockPosts);

  const filteredPosts = selectedCategory === "all spaces"
    ? posts
    : posts.filter(post => post.tags.includes(selectedCategory));

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="pb-24 md:pb-12">
      <FilterBar 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
          <Masonry gutter="24px">
            {filteredPosts.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Like Button Overlay */}
                    <motion.button
                      onClick={(e) => handleLike(post.id, e)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileTap={{ scale: 0.85 }}
                    >
                      <Heart
                        size={18}
                        className={post.isLiked ? "fill-red-500 text-red-500" : "text-neutral-600"}
                      />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-lg mb-2 text-neutral-900">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mb-3 line-clamp-2">
                      {post.description}
                    </p>

                    {/* Materials */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.materials.slice(0, 3).map((material, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-neutral-50 text-neutral-600 text-[10px] tracking-wider uppercase rounded"
                        >
                          {material}
                        </span>
                      ))}
                      {post.materials.length > 3 && (
                        <span className="px-2 py-1 text-neutral-400 text-[10px] tracking-wider uppercase">
                          +{post.materials.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Author & Likes */}
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-neutral-200 rounded-full flex items-center justify-center text-[10px] font-medium">
                          {post.author.avatar}
                        </div>
                        <span className="text-xs text-neutral-600">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-neutral-400">
                        <Heart size={14} className={post.isLiked ? "fill-red-500 text-red-500" : ""} />
                        <span className="text-xs">{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}
