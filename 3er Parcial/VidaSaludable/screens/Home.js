import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import RecipeCard from '../components/RecipeCard';
import RoutineItem from '../components/RoutineItem';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { ROUTINES, RECIPES, CATEGORIES } from '../data/mockData';

const Home = ({ navigation }) => {
  const [completedRoutines, setCompletedRoutines] = useState({});
  const [searchText, setSearchText] = useState('');
  const insets = useSafeAreaInsets();

  const toggleRoutine = (id) => {
    setCompletedRoutines((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredRoutines = ROUTINES.filter((r) =>
    r.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-bg">
      <StatusBar style="light" />
      <Header
        title="VidaSana"
        subtitle="¡Hola, Carlos!"
        showProfile
        navigation={navigation}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="mx-4 mt-4 mb-2 relative">
          <TextInput
            className="bg-surface rounded-xl px-4 py-3 pr-11 text-[15px] text-txt"
            style={globalStyles.shadowSm}
            placeholder="Buscar rutinas o recetas..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          <Text className="absolute right-4 top-3 text-[18px]">🔍</Text>
        </View>

        <View className="mt-4 px-4">
          <Text className="text-xl font-bold text-txt mb-4">Categorías</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            {CATEGORIES.map((item) => (
              <CategoryCard
                key={item.id}
                name={item.name}
                icon={item.icon}
                color={item.color}
                onPress={() => navigation.navigate('Recipes', { category: item.name })}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mt-4 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-txt">Rutinas de Hoy</Text>
            <TouchableOpacity>
              <Text className="text-sm font-semibold text-primary">Ver todas</Text>
            </TouchableOpacity>
          </View>
          {filteredRoutines.map((item) => (
            <RoutineItem
              key={item.id}
              name={item.name}
              duration={item.duration}
              category={item.category}
              icon={item.icon}
              completed={!!completedRoutines[item.id]}
              onPress={() => navigation.navigate('Routine', { routine: item })}
            />
          ))}
        </View>

        <View className="mt-4 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-txt">Recetas Saludables</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recipes')}>
              <Text className="text-sm font-semibold text-primary">Ver todas</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 8 }}
          >
            {RECIPES.map((item) => (
              <RecipeCard
                key={item.id}
                name={item.name}
                time={item.time}
                calories={item.calories}
                icon={item.icon}
                difficulty={item.difficulty}
                onPress={() => navigation.navigate('Details', { item, type: 'recipe' })}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
