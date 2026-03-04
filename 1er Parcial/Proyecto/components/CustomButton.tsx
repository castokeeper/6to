import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    type?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    icon?: keyof typeof Ionicons.glyphMap;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export default function CustomButton({
    title,
    onPress,
    type = 'primary',
    size = 'medium',
    icon,
    loading = false,
    disabled = false,
    style,
}: CustomButtonProps): React.JSX.Element {
    const buttonHeight = size === 'small' ? 40 : size === 'large' ? 56 : 48;
    const fontSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;
    const iconSize = size === 'small' ? 18 : size === 'large' ? 24 : 20;

    if (type === 'primary') {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.85}
                disabled={disabled || loading}
                style={[disabled && styles.disabled, style]}
            >
                <LinearGradient
                    colors={Colors.gradientPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.base, { height: buttonHeight }, Shadows.medium]}
                >
                    {loading ? (
                        <ActivityIndicator color={Colors.textOnPrimary} />
                    ) : (
                        <>
                            {icon && (
                                <Ionicons
                                    name={icon}
                                    size={iconSize}
                                    color={Colors.textOnPrimary}
                                    style={{ marginRight: Spacing.sm }}
                                />
                            )}
                            <Text style={[styles.textPrimary, { fontSize }]}>{title}</Text>
                        </>
                    )}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    const variantStyles: Record<string, ViewStyle> = {
        secondary: { backgroundColor: Colors.secondary },
        outline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: Colors.primary },
        danger: { backgroundColor: Colors.error },
    };

    const textColor =
        type === 'outline' ? Colors.primary : Colors.textOnPrimary;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            disabled={disabled || loading}
            style={[
                styles.base,
                { height: buttonHeight },
                variantStyles[type],
                Shadows.small,
                disabled && styles.disabled,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <>
                    {icon && (
                        <Ionicons
                            name={icon}
                            size={iconSize}
                            color={textColor}
                            style={{ marginRight: Spacing.sm }}
                        />
                    )}
                    <Text style={[styles.textPrimary, { fontSize, color: textColor }]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.xl,
    },
    textPrimary: {
        ...Typography.button,
        color: Colors.textOnPrimary,
    },
    disabled: {
        opacity: 0.5,
    },
});
