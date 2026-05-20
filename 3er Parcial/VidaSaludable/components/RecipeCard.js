import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const RecipeCard = ({ name, time, calories, icon, difficulty, onPress, fullWidth }) => {
  return (
    <TouchableOpacity
      className="bg-surface rounded-2xl overflow-hidden"
      style={[
        globalStyles.shadow,
        fullWidth ? { width: '100%' } : { width: 160, marginRight: 16 },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="h-24 bg-primary/10 items-center justify-center">
        <Text className="text-[40px]">{icon}</Text>
      </View>
      <View className="p-3">
        <Text className="text-sm font-bold text-txt mb-1" numberOfLines={1}>{name}</Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-[11px] text-txt-secondary">⏱ {time}</Text>
          <Text className="text-[11px] text-txt-secondary">🔥 {calories} cal</Text>
        </View>
        <View className="bg-primary-light/20 rounded-lg px-2 py-0.5 self-start">
          <Text className="text-[10px] font-semibold text-primary">{difficulty}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecipeCard;
