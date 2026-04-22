import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { Mail, Lock } from "lucide-react";

// PANTALLA 2: Login con Smart Animate
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simular login
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--primary-color)] to-[var(--accent-color)]">
      <div className="max-w-[390px] mx-auto min-h-screen flex flex-col justify-between px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-8"
        >
          <div className="w-24 h-24 bg-white rounded-3xl shadow-xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-5xl">🐾</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Bienvenido</h1>
          <p className="text-white/80">Inicia sesión en Pawsome</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Email Input */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-white/60" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-white/60" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/50 outline-none"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button className="text-white/80 text-sm">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          {/* Login Button */}
          <Button 
            variant="primary" 
            size="large" 
            fullWidth
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-white/60 text-sm">o continúa con</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-center gap-2 text-white">
              <span className="text-xl">🐶</span>
              <span className="text-sm">Google</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-center gap-2 text-white">
              <span className="text-xl">🐱</span>
              <span className="text-sm">Facebook</span>
            </button>
          </div>
        </motion.div>

        {/* Sign Up */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p className="text-white/80">
            ¿No tienes cuenta?{" "}
            <button className="text-white font-semibold">
              Regístrate
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
