import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Send } from "lucide-react";
import { Link } from "react-router";
import { PostCard } from "./ui/PostCard";
import { posts, stories } from "../mobile-data/mockData";

// PANTALLA 3: Home Feed con SCROLL VERTICAL (Requerimiento: Scroll)
export function Home() {
  const [feedPosts, setFeedPosts] = useState(posts);

  const handleLike = (postId: string) => {
    setFeedPosts(feedPosts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      {/* Top Bar */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--primary-color)]">Pawsome</h1>
          <div className="flex items-center gap-4">
            <Link to="/app/messages">
              <MessageCircle size={24} className="text-[var(--text-primary)]" />
            </Link>
            <Send size={24} className="text-[var(--text-primary)]" />
          </div>
        </div>

        {/* Stories con SCROLL HORIZONTAL (Requerimiento: Scroll Horizontal) */}
        <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {/* Add Story */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-white">
                <span className="text-2xl">➕</span>
              </div>
              <span className="text-xs text-[var(--text-secondary)] w-16 text-center truncate">Tu historia</span>
            </div>

            {/* Stories List con Auto Layout */}
            {stories.map((story) => (
              <motion.div
                key={story.id}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  story.hasNew 
                    ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)]" 
                    : "bg-gray-300"
                }`}>
                  <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                    <img 
                      src={story.petAvatar} 
                      alt={story.petName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="text-xs text-[var(--text-secondary)] w-16 text-center truncate">
                  {story.petName}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Feed con SCROLL VERTICAL (Auto Layout en lista) */}
      <div className="overflow-y-auto">
        {feedPosts.map((post) => (
          <PostCard 
            key={post.id} 
            post={post}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
}
