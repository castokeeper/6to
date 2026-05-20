import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../styles/globalStyles';

const CustomButton = ({ title, onPress, color, textColor, variant, style }) => {
  const isPrimary = variant !== 'outline';
  const bgColor = color || COLORS.primary;

  return (
    <TouchableOpacity
      className="rounded-xl py-3.5 px-6 items-center justify-center"
      style={[
        isPrimary ? { backgroundColor: bgColor } : { backgroundColor: 'transparent', borderWidth: 2, borderColor: bgColor },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        className="text-base font-bold"
        style={{ color: isPrimary ? (textColor || COLORS.textLight) : bgColor }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
