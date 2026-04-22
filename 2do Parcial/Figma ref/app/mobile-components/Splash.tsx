import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

// PANTALLA 1: Splash Screen con animación
export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)] flex items-center justify-center">
      <div className="max-w-[390px] w-full h-screen flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 0.8 
          }}
          className="mb-6"
        >
          <div className="w-32 h-32 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
            <span className="text-6xl">🐾</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-2">Pawsome</h1>
          <p className="text-white/80 text-lg">Red Social para Mascotas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-12"
        >
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
