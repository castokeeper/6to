import { Link, useLocation } from "react-router";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { motion } from "motion/react";

// COMPONENTE REUTILIZABLE: BottomNav (Requerimiento: Componentes)
export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.includes(path);
  };

  const navItems = [
    { path: "/app", icon: Home, label: "Inicio" },
    { path: "/app/explore", icon: Search, label: "Explorar" },
    { path: "/app/new-post", icon: PlusSquare, label: "Publicar" },
    { path: "/app/notifications", icon: Heart, label: "Notificaciones" },
    { path: "/app/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-[390px] mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link key={item.path} to={item.path} className="flex-1 flex justify-center">
              <motion.div 
                className="relative flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <Icon 
                  size={24} 
                  className={active ? "text-[var(--primary-color)]" : "text-[var(--text-secondary)]"}
                  strokeWidth={active ? 2.5 : 2}
                />
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 w-1 h-1 bg-[var(--primary-color)] rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
