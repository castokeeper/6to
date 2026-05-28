import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#4CAF50',
  secondary: '#81C784',
  accent: '#FF7043',
  background: '#F9FBF9',
  card: '#FFFFFF',
  text: '#1B2D1B',
  textLight: '#6B7F6B',
  textWhite: '#FFFFFF',
  border: '#E0EBE0',
  water: '#29B6F6',
  food: '#FFA726',
  exercise: '#AB47BC',
  danger: '#E53935',
};

export const FONTS = {
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  subtitle: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  body: { fontSize: 15, fontWeight: '400', color: COLORS.text },
  caption: { fontSize: 12, fontWeight: '400', color: COLORS.textLight },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
