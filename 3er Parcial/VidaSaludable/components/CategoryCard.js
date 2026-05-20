import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const CategoryCard = ({ name, icon, color, onPress }) => {
  return (
    <TouchableOpacity
      className="items-center justify-center rounded-2xl p-4 mr-3"
      style={{ backgroundColor: color + '15', minWidth: 76 }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        className="w-11 h-11 rounded-full items-center justify-center mb-1"
        style={{ backgroundColor: color + '25' }}
      >
        <Text className="text-[22px]">{icon}</Text>
      </View>
      <Text className="text-xs font-semibold text-txt text-center" numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
