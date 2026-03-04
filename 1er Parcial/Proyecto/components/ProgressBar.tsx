import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, BorderRadius, Spacing, Typography } from '@/constants/theme';

interface ProgressBarProps {
    percentage: number;
    showLabel?: boolean;
    height?: number;
}

export default function ProgressBar({
    percentage,
    showLabel = true,
    height = 14,
}: ProgressBarProps): React.JSX.Element {
    const clampedValue = Math.min(100, Math.max(0, percentage));

    return (
        <View style={styles.container}>
            {showLabel && (
                <View style={styles.labelRow}>
                    <Text style={styles.labelText}>Progreso de inscripción</Text>
                    <Text style={styles.percentText}>{clampedValue}%</Text>
                </View>
            )}
            <View style={[styles.track, { height }]}>
                <LinearGradient
                    colors={[Colors.accent, Colors.success]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.fill, { width: `${clampedValue}%`, height }]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    labelText: {
        ...Typography.bodySmall,
        color: Colors.textSecondary,
    },
    percentText: {
        ...Typography.subtitle,
        color: Colors.primary,
        fontSize: 14,
    },
    track: {
        width: '100%',
        backgroundColor: Colors.borderLight,
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: BorderRadius.full,
    },
});
