import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { AppTheme } from '@/constants/app-theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'disabled';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const isDisabled = disabled || loading || variant === 'disabled';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        pressed && !isDisabled ? styles.pressed : null,
        isDisabled ? styles.disabled : null,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? AppTheme.colors.primary : AppTheme.colors.card}
          size="small"
        />
      ) : (
        <Text style={[styles.label, labelVariantStyles[variant]]}>{children}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: AppTheme.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
  disabled: {
    opacity: 0.6,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: AppTheme.colors.primary,
  },
  secondary: {
    backgroundColor: AppTheme.colors.secondary,
  },
  outline: {
    backgroundColor: AppTheme.colors.card,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.primary,
  },
  disabled: {
    backgroundColor: '#D6D6D6',
  },
});

const labelVariantStyles = StyleSheet.create({
  primary: {
    color: AppTheme.colors.card,
  },
  secondary: {
    color: AppTheme.colors.primary,
  },
  outline: {
    color: AppTheme.colors.primary,
  },
  disabled: {
    color: '#6F6F6F',
  },
});

const sizeStyles = StyleSheet.create({
  small: {
    minHeight: 36,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  medium: {
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  large: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
});
