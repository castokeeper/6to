import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ title, subtitle, showBack, showProfile, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between bg-primary pb-4 px-4"
      style={{ paddingTop: insets.top + (Platform.OS === 'android' ? 12 : 8) }}
    >
      <View className="flex-row items-center flex-1 mr-2">
        {showBack && (
          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center mr-2"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-[20px] text-txt-light font-bold">←</Text>
          </TouchableOpacity>
        )}
        <View className="flex-1">
          {subtitle && <Text className="text-[13px] text-white/70 mb-0.5" numberOfLines={1}>{subtitle}</Text>}
          <Text className="text-[22px] font-bold text-txt-light" numberOfLines={1}>{title}</Text>
        </View>
      </View>
      {showProfile && (
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          onPress={() => navigation.navigate('Profile')}
        >
          <Text className="text-[20px]">👤</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
