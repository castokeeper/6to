/**
 * Constantes de tema para el Sistema de Inscripción Institucional.
 * Define paleta de colores, tipografía y sombras reutilizables.
 */

import { Platform, TextStyle, ViewStyle } from 'react-native';

// ─── Paleta de Colores Institucionales ───
export const Colors = {
  // Colores principales
  primary: '#1B3A5C',        // Azul marino institucional
  primaryLight: '#2A5A8C',   // Azul claro
  primaryDark: '#0F2640',    // Azul oscuro
  secondary: '#D4A843',      // Dorado institucional
  secondaryLight: '#E8C76A', // Dorado claro
  accent: '#3B82F6',         // Azul acento

  // Gradientes para botones
  gradientPrimary: ['#1B3A5C', '#2A5A8C'] as readonly [string, string],
  gradientSecondary: ['#D4A843', '#E8C76A'] as readonly [string, string],
  gradientBackground: ['#F0F4F8', '#E2E8F0'] as readonly [string, string],

  // Fondos
  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceElevated: '#FAFBFC',

  // Textos
  textPrimary: '#1A202C',
  textSecondary: '#4A5568',
  textMuted: '#A0AEC0',
  textOnPrimary: '#FFFFFF',
  textOnSecondary: '#1A202C',

  // Estados
  success: '#38A169',
  successLight: '#C6F6D5',
  warning: '#D69E2E',
  warningLight: '#FEFCBF',
  error: '#E53E3E',
  errorLight: '#FED7D7',
  info: '#3182CE',
  infoLight: '#BEE3F8',

  // Bordes y separadores
  border: '#E2E8F0',
  borderLight: '#EDF2F7',
  divider: '#E2E8F0',

  // Otros
  overlay: 'rgba(0, 0, 0, 0.5)',
  cardShadow: '#000000',
};

// ─── Tipografía ───
export const Typography = {
  // Títulos
  h1: {
    fontSize: 28,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 36,
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as TextStyle['fontWeight'],
    lineHeight: 32,
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 28,
    color: Colors.textPrimary,
  },
  // Subtítulos
  subtitle: {
    fontSize: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  // Cuerpo de texto
  body: {
    fontSize: 15,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: 'normal' as TextStyle['fontWeight'],
    lineHeight: 18,
    color: Colors.textMuted,
  },
  // Etiquetas
  label: {
    fontSize: 12,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 16,
    color: Colors.textMuted,
    textTransform: 'uppercase' as TextStyle['textTransform'],
    letterSpacing: 0.8,
  },
  // Botones
  button: {
    fontSize: 16,
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: 22,
    letterSpacing: 0.5,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: 20,
    letterSpacing: 0.3,
  },
};

// ─── Sombras ───
export const Shadows: Record<string, ViewStyle> = {
  small: Platform.select({
    ios: {
      shadowColor: Colors.cardShadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: Colors.cardShadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
  }) as ViewStyle,

  medium: Platform.select({
    ios: {
      shadowColor: Colors.cardShadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: Colors.cardShadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
  }) as ViewStyle,

  large: Platform.select({
    ios: {
      shadowColor: Colors.cardShadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: Colors.cardShadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
    },
  }) as ViewStyle,
};

// ─── Espaciado ───
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

// ─── Bordes Redondeados ───
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
