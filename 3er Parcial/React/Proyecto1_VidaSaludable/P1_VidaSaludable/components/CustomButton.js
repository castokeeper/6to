import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../styles/globalStyles';

const CustomButton = ({ title, onPress, color, textColor, loading, disabled, style }) => {
  const bgColor = color || COLORS.primary;
  const txtColor = textColor || COLORS.textWhite;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? '#ccc' : bgColor }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={txtColor} />
      ) : (
        <Text style={[styles.text, { color: txtColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default CustomButton;
