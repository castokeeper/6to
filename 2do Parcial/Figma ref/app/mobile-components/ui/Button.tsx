import { motion } from "motion/react";
import { ReactNode } from "react";

// COMPONENTE CON VARIANTES (Requerimiento: Componentes y Variantes)
interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "disabled";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "medium",
  fullWidth = false,
  onClick,
  icon 
}: ButtonProps) {
  const baseStyles = "rounded-full font-medium transition-all flex items-center justify-center gap-2";
  
  const variantStyles = {
    primary: "bg-[var(--primary-color)] text-white shadow-md active:scale-95",
    secondary: "bg-[var(--secondary-color)] text-[var(--primary-color)] active:scale-95",
    outline: "bg-white border-2 border-[var(--primary-color)] text-[var(--primary-color)] active:scale-95",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed"
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileTap={variant !== "disabled" ? { scale: 0.95 } : {}}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle}`}
      onClick={variant !== "disabled" ? onClick : undefined}
      disabled={variant === "disabled"}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}
