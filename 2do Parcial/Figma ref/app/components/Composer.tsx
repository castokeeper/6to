import { useState } from "react";
import { motion } from "motion/react";
import { Upload, X, Plus, Tag } from "lucide-react";
import { useNavigate } from "react-router";

interface PhotoStack {
  id: string;
  url: string;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export function Composer() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<PhotoStack[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [materials, setMaterials] = useState<string[]>([]);
  const [newMaterial, setNewMaterial] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto: PhotoStack = {
          id: Math.random().toString(36).substr(2, 9),
          url: event.target?.result as string,
          rotation: Math.random() * 6 - 3, // Random rotation between -3 and 3 degrees
          offsetX: Math.random() * 20 - 10,
          offsetY: Math.random() * 20 - 10,
        };
        setPhotos((prev) => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials([...materials, newMaterial.trim()]);
      setNewMaterial("");
    }
  };

  const removeMaterial = (material: string) => {
    setMaterials(materials.filter(m => m !== material));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePublish = () => {
    // In a real app, this would save to backend
    console.log("Publishing:", { title, description, materials, tags, photos });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] py-12 px-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-serif mb-2">New Composition</h1>
          <p className="text-sm text-neutral-500 tracking-wide">
            Stack your inspirations like a drafting table
          </p>
        </div>

        {/* Drafting Table - Photo Stack */}
        <div className="bg-white rounded-2xl p-12 mb-8 shadow-sm min-h-[400px] relative">
          <div className="absolute top-6 right-6 text-xs tracking-[0.15em] uppercase text-neutral-300">
            Drafting Table
          </div>

          {photos.length === 0 ? (
            <label className="flex flex-col items-center justify-center h-80 border-2 border-dashed border-neutral-200 rounded-xl cursor-pointer hover:border-neutral-300 transition-colors">
              <Upload size={40} className="text-neutral-300 mb-4" />
              <span className="text-sm text-neutral-400 tracking-wide mb-2">
                Drop images or click to upload
              </span>
              <span className="text-xs text-neutral-300 tracking-wider uppercase">
                Multiple files supported
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative min-h-80">
              {/* Polaroid Stack */}
              <div className="flex flex-wrap gap-6 justify-center items-start">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      rotate: photo.rotation,
                      x: photo.offsetX,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      delay: index * 0.1 
                    }}
                    drag
                    dragElastic={0.1}
                    dragConstraints={{ top: -50, left: -50, right: 50, bottom: 50 }}
                    className="relative bg-white p-3 shadow-lg hover:shadow-xl transition-shadow cursor-move"
                    style={{
                      width: "220px",
                    }}
                  >
                    <img
                      src={photo.url}
                      alt="Uploaded"
                      className="w-full h-56 object-cover"
                    />
                    <div className="h-12" /> {/* Polaroid bottom space */}
                    
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Add More Button */}
              <label className="inline-flex items-center gap-2 mt-6 px-4 py-2 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors">
                <Plus size={16} className="text-neutral-400" />
                <span className="text-sm text-neutral-600 tracking-wide">Add more</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <input
            type="text"
            placeholder="Untitled Composition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-serif mb-4 bg-transparent border-none outline-none placeholder:text-neutral-300"
          />
          <textarea
            placeholder="Describe your vision, materials, and inspiration..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full text-base text-neutral-700 bg-transparent border-none outline-none resize-none placeholder:text-neutral-300"
          />
        </div>

        {/* Material Palette */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-4 flex items-center gap-2">
            <Tag size={12} />
            Material Palette
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {materials.map((material) => (
              <motion.span
                key={material}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-2 bg-neutral-50 text-neutral-700 text-sm tracking-wide rounded-full border border-neutral-200 flex items-center gap-2"
              >
                {material}
                <button
                  onClick={() => removeMaterial(material)}
                  className="text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., oak veneer, linen, brass"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMaterial()}
              className="flex-1 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none focus:border-neutral-400 transition-colors"
            />
            <button
              onClick={addMaterial}
              className="px-6 py-2 bg-neutral-900 text-white text-sm tracking-wide rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h3 className="text-xs tracking-[0.15em] uppercase text-neutral-400 mb-4">Categories</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-3 py-2 bg-neutral-50 text-neutral-700 text-sm tracking-wide rounded-full border border-neutral-200 flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </motion.span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g., living room, minimalist, scandinavian"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTag()}
              className="flex-1 px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm outline-none focus:border-neutral-400 transition-colors"
            />
            <button
              onClick={addTag}
              className="px-6 py-2 bg-neutral-900 text-white text-sm tracking-wide rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 px-6 py-3 bg-white text-neutral-600 text-sm tracking-wide rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            disabled={photos.length === 0 || !title}
            className="flex-1 px-6 py-3 bg-neutral-900 text-white text-sm tracking-wide rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}
