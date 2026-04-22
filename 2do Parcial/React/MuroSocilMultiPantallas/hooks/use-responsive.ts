import { useWindowDimensions } from 'react-native';

/**
 * Hook centralizado de responsividad.
 * Escala tamaños de fuente, espaciado y dimensiones
 * en función del ancho real de la pantalla.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();

  // Breakpoints
  const isTablet = width >= 768;
  const isLandscape = width > height;

  // Factor de escala base (diseñado para 375px de ancho)
  const scale = width / 375;
  const clamp = (val: number, min: number, max: number) =>
    Math.min(Math.max(val * scale, min), max);

  return {
    width,
    height,
    isTablet,
    isLandscape,

    // Tipografía
    fs: {
      xs: clamp(11, 10, 16),
      sm: clamp(13, 12, 18),
      md: clamp(15, 14, 20),
      lg: clamp(17, 16, 24),
      xl: clamp(22, 20, 30),
      xxl: clamp(26, 22, 36),
    },

    // Espaciado
    sp: {
      xs: clamp(8, 6, 14),
      sm: clamp(12, 10, 20),
      md: clamp(16, 14, 26),
      lg: clamp(20, 18, 32),
      xl: clamp(24, 20, 40),
    },

    // Ancho máximo del contenido (centrado en tablets)
    contentWidth: isTablet ? Math.min(width * 0.75, 600) : width,

    // Altura del textarea del formulario
    textareaHeight: clamp(110, 90, 160),

    // Tamaño del ícono de confirmación
    iconSize: clamp(100, 80, 130),
    iconFontSize: clamp(50, 40, 65),
  };
}
