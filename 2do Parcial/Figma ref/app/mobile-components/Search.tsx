import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { pets, posts } from "../mobile-data/mockData";

// PANTALLA 12: Búsqueda
export function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"pets" | "posts">("pets");

  const filteredPets = pets.filter(pet =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-[var(--text-primary)]" />
          </button>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
            <SearchIcon size={18} className="text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("pets")}
          className={`flex-1 py-3 relative ${
            activeTab === "pets" ? "text-[var(--primary-color)]" : "text-[var(--text-secondary)]"
          }`}
        >
          <span className="font-medium">Mascotas</span>
          {activeTab === "pets" && (
            <motion.div
              layoutId="searchTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-color)]"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex-1 py-3 relative ${
            activeTab === "posts" ? "text-[var(--primary-color)]" : "text-[var(--text-secondary)]"
          }`}
        >
          <span className="font-medium">Publicaciones</span>
          {activeTab === "posts" && (
            <motion.div
              layoutId="searchTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary-color)]"
            />
          )}
        </button>
      </div>

      {/* Results */}
      <div className="p-4">
        {activeTab === "pets" ? (
          <div className="space-y-3">
            {filteredPets.length > 0 ? (
              filteredPets.map((pet, idx) => (
                <motion.div
                  key={pet.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link to={`/app/pet/${pet.id}`} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl">
                    <img
                      src={pet.avatar}
                      alt={pet.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--text-primary)]">{pet.name}</p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {pet.species === "dog" ? "🐕" : "🐱"} {pet.breed} • {pet.followers.toLocaleString()} seguidores
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : searchQuery ? (
              <p className="text-center text-[var(--text-secondary)] py-12">No se encontraron mascotas</p>
            ) : (
              <p className="text-center text-[var(--text-secondary)] py-12">Busca mascotas por nombre</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, idx) => (
                <Link key={post.id} to={`/app/post/${post.id}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="aspect-square bg-gray-100"
                  >
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </Link>
              ))
            ) : searchQuery ? (
              <div className="col-span-3 text-center text-[var(--text-secondary)] py-12">
                No se encontraron publicaciones
              </div>
            ) : (
              <div className="col-span-3 text-center text-[var(--text-secondary)] py-12">
                Busca publicaciones por descripción
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
