import { motion } from "motion/react";
import { notifications } from "../mobile-data/mockData";
import { Heart, UserPlus, MessageCircle } from "lucide-react";
import { Button } from "./ui/Button";

// PANTALLA 6: Notificaciones
export function Notifications() {
  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-[var(--accent-color)]" />;
      case "follow":
        return <UserPlus size={16} className="text-[var(--primary-color)]" />;
      case "comment":
        return <MessageCircle size={16} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-40 px-4 py-4">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Notificaciones</h1>
      </div>

      {/* Notifications List con Auto Layout */}
      <div className="divide-y divide-gray-100">
        {notifications.map((notification, idx) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 flex items-start gap-3 ${!notification.read ? "bg-blue-50" : ""}`}
          >
            <div className="relative">
              <img
                src={notification.petAvatar}
                alt={notification.petName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                {getIcon(notification.type)}
              </div>
            </div>

            <div className="flex-1">
              <p className="text-sm text-[var(--text-primary)]">
                <span className="font-semibold">{notification.petName}</span>{" "}
                {notification.message}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                {notification.timestamp}
              </p>
            </div>

            {notification.type === "follow" && (
              <Button variant="primary" size="small">
                Seguir
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
