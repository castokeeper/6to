import { useState } from "react";
import { motion } from "motion/react";
import { Settings, Grid, Bookmark } from "lucide-react";
import { moodBubbles, mockPosts } from "../data/mockData";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Profile() {
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");
  
  // Mock user data
  const user = {
    name: "Elena Martinez",
    username: "@elenamartinez",
    bio: "Interior Designer & Set Stylist based in Copenhagen. Exploring the intersection of minimalism and warmth.",
    avatar: "EM",
    followers: 12400,
    following: 342,
    posts: mockPosts.slice(0, 6),
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] pb-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center text-2xl font-medium">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-serif mb-1">{user.name}</h1>
                <p className="text-sm text-neutral-500 mb-3">{user.username}</p>
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-medium text-neutral-900">{user.posts.length}</span>
                    <span className="text-neutral-500 ml-1">posts</span>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-900">{user.followers.toLocaleString()}</span>
                    <span className="text-neutral-500 ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-medium text-neutral-900">{user.following}</span>
                    <span className="text-neutral-500 ml-1">following</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Settings size={20} className="text-neutral-600" />
            </button>
          </div>

          <p className="text-sm text-neutral-700 leading-relaxed max-w-2xl mb-8">
            {user.bio}
          </p>

          <div className="flex gap-3">
            <button className="px-6 py-2 bg-neutral-900 text-white text-sm tracking-wide rounded-lg hover:bg-neutral-800 transition-colors">
              Edit Profile
            </button>
            <button className="px-6 py-2 bg-white text-neutral-600 text-sm tracking-wide rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
              Share Profile
            </button>
          </div>
        </div>

        {/* Mood Bubbles */}
        <div className="mb-12">
          <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-4">
            Mood Collections
          </h3>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide">
            {moodBubbles.map((bubble) => (
              <motion.button
                key={bubble.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-neutral-200 group-hover:ring-neutral-400 transition-all">
                  <ImageWithFallback
                    src={bubble.imageUrl}
                    alt={bubble.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-neutral-700 tracking-wide">{bubble.name}</p>
                  <p className="text-[10px] text-neutral-400">{bubble.postCount} posts</p>
                </div>
              </motion.button>
            ))}
            
            {/* Add New Bubble */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 flex-shrink-0"
            >
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center hover:border-neutral-400 transition-colors">
                <span className="text-2xl text-neutral-300">+</span>
              </div>
              <p className="text-xs text-neutral-400 tracking-wide">New</p>
            </motion.button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-8">
          <div className="flex gap-12">
            <button
              onClick={() => setActiveTab("posts")}
              className={`pb-3 flex items-center gap-2 text-sm tracking-wide transition-colors relative ${
                activeTab === "posts"
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Grid size={16} />
              Posts
              {activeTab === "posts" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-3 flex items-center gap-2 text-sm tracking-wide transition-colors relative ${
                activeTab === "saved"
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              }`}
            >
              <Bookmark size={16} />
              Saved
              {activeTab === "saved" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                />
              )}
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-4">
          {user.posts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {activeTab === "saved" && (
          <div className="flex flex-col items-center justify-center py-20">
            <Bookmark size={48} className="text-neutral-200 mb-4" />
            <p className="text-sm text-neutral-400">No saved posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
