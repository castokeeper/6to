import { motion } from "motion/react";
import { Settings, Grid, Bookmark } from "lucide-react";
import { Link } from "react-router";
import { currentUser, posts } from "../mobile-data/mockData";
import { Button } from "./ui/Button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// PANTALLA 7: Profile
export function Profile() {
  const userPosts = posts.filter(p => p.petId === currentUser.id);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">{currentUser.name}</h1>
          <Link to="/app/settings">
            <Settings size={24} className="text-[var(--text-primary)]" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        {/* Profile Info */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-[var(--primary-color)]"
          >
            <ImageWithFallback
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="flex justify-around mb-4">
              <div className="text-center">
                <p className="text-xl font-bold text-[var(--text-primary)]">{currentUser.posts}</p>
                <p className="text-xs text-[var(--text-secondary)]">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[var(--text-primary)]">{currentUser.followers.toLocaleString()}</p>
                <p className="text-xs text-[var(--text-secondary)]">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-[var(--text-primary)]">{currentUser.following}</p>
                <p className="text-xs text-[var(--text-secondary)]">Siguiendo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h2 className="font-semibold text-[var(--text-primary)] mb-1">{currentUser.name}</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-1">{currentUser.breed} • {currentUser.age} años</p>
          <p className="text-sm text-[var(--text-primary)]">{currentUser.bio}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">🏠 {currentUser.owner}</p>
        </div>

        {/* Action Buttons con Auto Layout */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="secondary" size="medium" fullWidth>
            Editar Perfil
          </Button>
          <Button variant="outline" size="medium" fullWidth>
            Compartir
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          <button className="flex-1 py-3 border-b-2 border-[var(--primary-color)] text-[var(--primary-color)]">
            <Grid size={20} className="mx-auto" />
          </button>
          <button className="flex-1 py-3 text-[var(--text-secondary)]">
            <Bookmark size={20} className="mx-auto" />
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {userPosts.map((post) => (
            <Link key={post.id} to={`/app/post/${post.id}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-square bg-gray-100"
              >
                <ImageWithFallback
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
