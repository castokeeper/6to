import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Image, MapPin, Smile } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/Button";

// PANTALLA 5: Crear Post con OVERLAY (Requerimiento: Overlay)
export function NewPost() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const emojis = ["😊", "❤️", "🐶", "🐱", "🐾", "😍", "🎉", "🌟", "🌈", "⭐", "💕", "🎈"];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    // Simular publicación
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/app")}>
            <X size={24} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">Nueva publicación</h1>
          <button
            onClick={handlePost}
            className="text-[var(--primary-color)] font-semibold"
            disabled={!caption && !selectedImage}
          >
            Publicar
          </button>
        </div>
      </div>

      <div className="p-4">
        {/* Image Preview */}
        {selectedImage ? (
          <div className="mb-4 relative">
            <img 
              src={selectedImage} 
              alt="Preview"
              className="w-full aspect-square object-cover rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="block mb-4 cursor-pointer">
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-[var(--primary-color)] transition-colors">
              <Image size={48} className="text-gray-400 mb-2" />
              <p className="text-[var(--text-secondary)] text-sm">Toca para seleccionar una foto</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </label>
        )}

        {/* Caption Input */}
        <div className="mb-4">
          <textarea
            placeholder="Escribe un pie de foto..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="w-full p-4 bg-gray-50 rounded-2xl resize-none outline-none focus:ring-2 focus:ring-[var(--primary-color)] text-[var(--text-primary)]"
          />
        </div>

        {/* Actions con Auto Layout */}
        <div className="space-y-3">
          <button 
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="w-full p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Smile size={20} className="text-[var(--primary-color)]" />
              <span className="text-[var(--text-primary)]">Añadir emoji</span>
            </div>
            <span className="text-[var(--text-secondary)]">→</span>
          </button>

          <button className="w-full p-4 bg-gray-50 rounded-2xl flex items-center justify-between hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-[var(--primary-color)]" />
              <span className="text-[var(--text-primary)]">Añadir ubicación</span>
            </div>
            <span className="text-[var(--text-secondary)]">→</span>
          </button>
        </div>
      </div>

      {/* OVERLAY: Emoji Picker (Requerimiento: Overlay) */}
      <AnimatePresence>
        {showEmojiPicker && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Emoji Picker Modal */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50"
            >
              <div className="max-w-[390px] mx-auto bg-white rounded-t-3xl p-6">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Selecciona un emoji</h3>
                <div className="grid grid-cols-6 gap-3 mb-4">
                  {emojis.map((emoji, idx) => (
                    <motion.button
                      key={idx}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setCaption(caption + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-3xl hover:bg-gray-100 transition-colors"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
