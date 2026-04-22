import { motion } from "motion/react";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router";
import { pets } from "../mobile-data/mockData";

// PANTALLA 10: Mensajes
export function Messages() {
  const navigate = useNavigate();

  const mockChats = pets.slice(0, 4).map((pet, idx) => ({
    ...pet,
    lastMessage: ["¡Hola! ¿Cómo estás?", "Gracias por seguirme", "¿Vamos al parque?", "🐾❤️"][idx],
    time: ["Ahora", "Hace 5 min", "Hace 1h", "Ayer"][idx],
    unread: idx < 2
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} className="text-[var(--text-primary)]" />
            </button>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">Mensajes</h1>
          </div>
          <Search size={24} className="text-[var(--text-primary)]" />
        </div>
      </div>

      {/* Chats List */}
      <div className="divide-y divide-gray-100">
        {mockChats.map((chat, idx) => (
          <motion.div
            key={chat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer"
          >
            <div className="relative">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              {chat.unread && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent-color)] rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-semibold text-[var(--text-primary)] truncate">{chat.name}</h3>
                <span className="text-xs text-[var(--text-secondary)] ml-2 flex-shrink-0">{chat.time}</span>
              </div>
              <p className={`text-sm truncate ${chat.unread ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}`}>
                {chat.lastMessage}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
