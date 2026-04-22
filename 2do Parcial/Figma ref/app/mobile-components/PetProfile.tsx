import { motion } from "motion/react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { pets, posts } from "../mobile-data/mockData";
import { Button } from "./ui/Button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// PANTALLA 9: Perfil de otra mascota
export function PetProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = pets.find(p => p.id === id);
  const petPosts = posts.filter(p => p.petId === id);

  if (!pet) {
    return <div>Mascota no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">{pet.name}</h1>
          <MoreVertical size={24} className="text-[var(--text-primary)]" />
        </div>
      </div>

      <div className="p-4">
        {/* Profile Info */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-[var(--primary-color)]"
          >
            <ImageWithFallback
              src={pet.avatar}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-lg font-bold text-[var(--text-primary)]">{pet.posts}</p>
                <p className="text-xs text-[var(--text-secondary)]">Posts</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[var(--text-primary)]">{pet.followers.toLocaleString()}</p>
                <p className="text-xs text-[var(--text-secondary)]">Seguidores</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[var(--text-primary)]">{pet.following}</p>
                <p className="text-xs text-[var(--text-secondary)]">Siguiendo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <h2 className="font-semibold text-[var(--text-primary)] mb-1">{pet.name}</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-1">
            {pet.species === "dog" ? "🐕" : "🐱"} {pet.breed} • {pet.age} años
          </p>
          <p className="text-sm text-[var(--text-primary)]">{pet.bio}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">🏠 {pet.owner}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button variant="primary" size="medium" fullWidth>
            Seguir
          </Button>
          <Button variant="outline" size="medium" fullWidth>
            Mensaje
          </Button>
          <Button variant="outline" size="medium">
            <MoreVertical size={18} />
          </Button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-3 gap-1">
          {petPosts.map((post) => (
            <Link key={post.id} to={`/app/post/${post.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
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

        {petPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)]">Aún no hay publicaciones</p>
          </div>
        )}
      </div>
    </div>
  );
}
