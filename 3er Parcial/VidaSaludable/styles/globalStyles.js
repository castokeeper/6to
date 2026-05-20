import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#2B6E3F',
  primaryDark: '#1B5E30',
  primaryLight: '#4CAF50',
  accent: '#FF6B4A',
  background: '#F0F2F5',
  surface: '#FFFFFF',
  surfaceDark: '#1A2E1A',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#FFFFFF',
  border: '#E5E7EB',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  overlay: 'rgba(0,0,0,0.5)',
};

export const globalStyles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowSm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
