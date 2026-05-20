import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const RoutineItem = ({ name, duration, category, icon, completed, onPress }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-surface rounded-2xl p-4 mb-2"
      style={globalStyles.shadowSm}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${completed ? 'bg-success/20' : 'bg-primary/10'}`}>
        <Text className="text-[22px]">{icon}</Text>
      </View>
      <View className="flex-1">
        <Text className={`text-[15px] font-semibold mb-0.5 ${completed ? 'line-through text-txt-secondary' : 'text-txt'}`}>
          {name}
        </Text>
        <Text className="text-[13px] text-txt-secondary">{duration} · {category}</Text>
      </View>
      <View className={`w-8 h-8 rounded-full items-center justify-center ${completed ? 'bg-success' : 'bg-primary/10'}`}>
        <Text className="text-sm font-bold text-primary">{completed ? '✓' : '▶'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoutineItem;
