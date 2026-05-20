import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Header = ({ title, subtitle, showBack, showProfile, navigation }) => {
  return (
    <View className="flex-row items-center justify-between bg-primary pt-[50px] pb-4 px-4">
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity
            className="w-9 h-9 rounded-full bg-white/20 items-center justify-center mr-2"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-[20px] text-txt-light font-bold">←</Text>
          </TouchableOpacity>
        )}
        <View>
          {subtitle && <Text className="text-[13px] text-white/70 mb-0.5">{subtitle}</Text>}
          <Text className="text-[22px] font-bold text-txt-light">{title}</Text>
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
