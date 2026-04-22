import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, Bell, Lock, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router";

// PANTALLA 11: Configuración
export function Settings() {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: "Cuenta",
      items: [
        { icon: Bell, label: "Notificaciones", color: "text-blue-500" },
        { icon: Lock, label: "Privacidad y seguridad", color: "text-green-500" },
      ]
    },
    {
      title: "Soporte",
      items: [
        { icon: HelpCircle, label: "Ayuda", color: "text-purple-500" },
      ]
    },
    {
      title: "Cuenta",
      items: [
        { icon: LogOut, label: "Cerrar sesión", color: "text-red-500" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-[var(--text-primary)]" />
          </button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Configuración</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {settingsSections.map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIdx * 0.1 }}
          >
            <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase mb-3 px-2">
              {section.title}
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden">
              {section.items.map((item, idx) => (
                <button
                  key={idx}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={22} className={item.color} />
                    <span className="text-[var(--text-primary)]">{item.label}</span>
                  </div>
                  <ChevronRight size={20} className="text-[var(--text-secondary)]" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="text-center pt-4">
          <p className="text-xs text-[var(--text-secondary)]">Versión 1.0.0</p>
          <p className="text-xs text-[var(--text-secondary)]">Pawsome © 2026</p>
        </div>
      </div>
    </div>
  );
}
