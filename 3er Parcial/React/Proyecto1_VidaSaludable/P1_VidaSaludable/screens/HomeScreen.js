import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput,
  TouchableOpacity, ScrollView,
} from 'react-native';
import HealthCard from '../components/HealthCard';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { useHealth } from '../context/HealthContext';

const ALL_ITEMS = [
  // Recetas
  { id: '1', title: 'Bowl de Avena con Frutas', subtitle: 'Desayuno • 320 kcal', emoji: '🥣', color: COLORS.food, type: 'recipe', duration: '10 min', level: 'Fácil', description: 'Mezcla avena con leche, agrega plátano, fresas y un toque de miel. Rico en fibra y energía para empezar el día.', ingredients: ['1 taza avena', '1 taza leche', '1 plátano', '1/2 taza fresas', '1 cdta miel'], calories: 320 },
  { id: '2', title: 'Ensalada Mediterránea', subtitle: 'Almuerzo • 280 kcal', emoji: '🥗', color: COLORS.food, type: 'recipe', duration: '15 min', level: 'Fácil', description: 'Mezcla lechuga, jitomate, pepino, aceitunas y queso feta. Aliña con aceite de oliva y limón.', ingredients: ['2 tazas lechuga', '1 jitomate', '1 pepino', '1/4 taza aceitunas', '50g queso feta'], calories: 280 },
  { id: '3', title: 'Smoothie Verde', subtitle: 'Snack • 180 kcal', emoji: '🥤', color: COLORS.food, type: 'recipe', duration: '5 min', level: 'Fácil', description: 'Licúa espinaca, plátano, manzana y un poco de jengibre con agua de coco. Refrescante y nutritivo.', ingredients: ['1 taza espinaca', '1 plátano', '1 manzana', '1 trozo jengibre', '1 taza agua de coco'], calories: 180 },
  { id: '4', title: 'Pollo al Limón con Verduras', subtitle: 'Cena • 450 kcal', emoji: '🍗', color: COLORS.food, type: 'recipe', duration: '30 min', level: 'Medio', description: 'Pechuga de pollo marinada en limón, ajo y hierbas, acompañada de brócoli y zanahoria al vapor.', ingredients: ['200g pechuga pollo', '1 limón', '2 dientes ajo', '1 taza brócoli', '1 zanahoria'], calories: 450 },
  // Ejercicios
  { id: '5', title: 'Caminata Matutina', subtitle: 'Cardio • 30 min', emoji: '🚶', color: COLORS.exercise, type: 'exercise', duration: '30 min', level: 'Principiante', description: 'Sal a caminar a paso moderado. Mantén la espalda recta y los brazos en movimiento. Ideal para activar el metabolismo.', ingredients: ['Ropa cómoda', 'Agua', 'Tenis deportivos'], calories: 150 },
  { id: '6', title: 'Rutina de Yoga', subtitle: 'Flexibilidad • 20 min', emoji: '🧘', color: COLORS.exercise, type: 'exercise', duration: '20 min', level: 'Principiante', description: 'Serie de posturas de yoga para mejorar la flexibilidad y reducir el estrés. Incluye saludo al sol y posturas básicas.', ingredients: ['Tapete de yoga', 'Ropa cómoda', 'Espacio tranquilo'], calories: 80 },
  { id: '7', title: 'HIIT 15 Minutos', subtitle: 'Intenso • 15 min', emoji: '🏃', color: COLORS.exercise, type: 'exercise', duration: '15 min', level: 'Avanzado', description: '4 rondas de: 30 seg sentadillas, 30 seg saltos, 30 seg planchas, 30 seg descanso. Quema máxima de calorías.', ingredients: ['Ropa deportiva', 'Agua', 'Tapete'], calories: 200 },
  { id: '8', title: 'Fuerza con Peso Corporal', subtitle: 'Fuerza • 25 min', emoji: '💪', color: COLORS.exercise, type: 'exercise', duration: '25 min', level: 'Intermedio', description: '3 series de: 15 lagartijas, 20 sentadillas, 10 fondos, 30 seg plancha. Tonifica sin necesitar equipo.', ingredients: ['Tapete', 'Agua', 'Toalla'], calories: 180 },
];

const FILTERS = ['Todos', 'Recetas 🍽️', 'Ejercicios 🏋️'];

const HomeScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Todos');
  const { completedToday } = useHealth();

  const filtered = ALL_ITEMS.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'Todos' ||
      (filter === 'Recetas 🍽️' && item.type === 'recipe') ||
      (filter === 'Ejercicios 🏋️' && item.type === 'exercise');
    return matchSearch && matchFilter;
  });

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola! 👋</Text>
          <Text style={styles.subGreeting}>¿Qué haremos hoy?</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileBtn}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar recetas o ejercicios..."
          placeholderTextColor={COLORS.textLight}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HealthCard
            title={item.title}
            subtitle={item.subtitle}
            emoji={item.emoji}
            color={item.color}
            completed={completedToday.includes(item.title)}
            onPress={() => navigation.navigate('Details', { item })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No se encontraron resultados 😕</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  profileBtn: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 22,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 22,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
  },
  filterScroll: {
    paddingHorizontal: 16,
    marginTop: 12,
    maxHeight: 44,
  },
  filterChip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    paddingVertical: 12,
    paddingBottom: 40,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});

export default HomeScreen;
