import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { RECIPES } from '../data/mockData';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 16;
const cardGap = 12;
const cardWidth = (screenWidth - horizontalPadding * 2 - cardGap) / 2;

const Recipes = ({ route, navigation }) => {
  const initialCategory = route.params?.category || '';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const insets = useSafeAreaInsets();

  const categories = ['', ...new Set(RECIPES.map((r) => r.category))];

  const filtered = RECIPES.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !selectedCategory || r.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <View className="flex-1 bg-bg">
      <StatusBar style="light" />
      <Header title="Recetas" showBack navigation={navigation} />

      <View className="mx-4 mt-4 relative">
        <TextInput
          className="bg-surface rounded-xl px-4 py-3 pr-11 text-[15px] text-txt"
          style={globalStyles.shadowSm}
          placeholder="Buscar receta..."
          placeholderTextColor={COLORS.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        <Text className="absolute right-4 top-3 text-[18px]">🔍</Text>
      </View>

      <View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item || 'all'}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`rounded-full px-4 py-2 mr-2 border ${
                selectedCategory === item ? 'bg-primary border-primary' : 'bg-surface border-gray-200'
              }`}
              onPress={() => setSelectedCategory(item)}
              activeOpacity={0.7}
            >
              <Text
                className={`text-[13px] font-semibold ${
                  selectedCategory === item ? 'text-white' : 'text-txt-secondary'
                }`}
              >
                {item || 'Todas'}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingBottom: insets.bottom + 24 }}
        columnWrapperStyle={{ gap: cardGap, marginBottom: cardGap }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth }}>
            <RecipeCard
              name={item.name}
              time={item.time}
              calories={item.calories}
              icon={item.icon}
              difficulty={item.difficulty}
              fullWidth
              onPress={() => navigation.navigate('Details', { item, type: 'recipe' })}
            />
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center justify-center pt-16">
            <Text className="text-[48px] mb-4">🔍</Text>
            <Text className="text-base text-txt-secondary">No se encontraron recetas</Text>
          </View>
        }
      />
    </View>
  );
};

export default Recipes;
