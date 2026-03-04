import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, Shadows } from '@/constants/theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    value,
    onChangeText,
    placeholder = 'Buscar carrera...',
}: SearchBarProps): React.JSX.Element {
    return (
        <View style={[styles.container, Shadows.small]}>
            <Ionicons name="search-outline" size={20} color={Colors.textMuted} />
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={Colors.textMuted}
            />
            {value.length > 0 && (
                <Ionicons
                    name="close-circle"
                    size={20}
                    color={Colors.textMuted}
                    onPress={() => onChangeText('')}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        paddingHorizontal: Spacing.lg,
        height: 48,
        marginBottom: Spacing.lg,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
        marginLeft: Spacing.sm,
    },
});
