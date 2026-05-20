import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const StatsRow = ({ label, value, goal, unit, icon, color }) => {
  const progress = Math.min((value / goal) * 100, 100);

  return (
    <View className="flex-row items-center bg-surface rounded-2xl p-4 mb-2" style={globalStyles.shadowSm}>
      <View
        className="w-11 h-11 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: (color || '#2B6E3F') + '20' }}
      >
        <Text className="text-[20px]">{icon}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="text-sm font-semibold text-txt">{label}</Text>
          <Text className="text-sm font-bold text-txt">
            {value}<Text className="font-normal text-txt-secondary">/{goal} {unit}</Text>
          </Text>
        </View>
        <View className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <View
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: color || '#2B6E3F' }}
          />
        </View>
      </View>
    </View>
  );
};

export default StatsRow;
