import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { Career } from '@/data/careers';

interface CareerCardProps {
    career: Career;
    onPress: (career: Career) => void;
    variant?: 'default' | 'compact';
}

export default function CareerCard({
    career,
    onPress,
    variant = 'default',
}: CareerCardProps): React.JSX.Element {
    if (variant === 'compact') {
        return (
            <TouchableOpacity
                style={[styles.compactCard, Shadows.small]}
                onPress={() => onPress(career)}
                activeOpacity={0.9}
            >
                <Image source={{ uri: career.image }} style={styles.compactImage} />
                <View style={styles.compactInfo}>
                    <Text style={styles.compactName} numberOfLines={1}>{career.name}</Text>
                    <Text style={styles.compactCategory}>{career.category}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[styles.card, Shadows.medium]}
            onPress={() => onPress(career)}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: career.image }} style={styles.image} />
                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{career.category}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{career.name}</Text>
                <View style={styles.meta}>
                    <View style={styles.metaItem}>
                        <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
                        <Text style={styles.metaText}>{career.duration}</Text>
                    </View>
                    <View style={styles.metaItem}>
                        <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
                        <Text style={styles.metaText}>{career.modality}</Text>
                    </View>
                </View>
                <Text style={styles.price}>
                    ${career.price.toLocaleString('es-MX')} MXN
                    <Text style={styles.pricePeriod}> /semestre</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        marginBottom: Spacing.lg,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 160,
    },
    categoryBadge: {
        position: 'absolute',
        top: Spacing.md,
        left: Spacing.md,
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.sm,
    },
    categoryText: {
        ...Typography.bodySmall,
        color: Colors.textOnPrimary,
        fontWeight: '600',
    },
    info: {
        padding: Spacing.lg,
    },
    name: {
        ...Typography.h3,
        marginBottom: Spacing.sm,
    },
    meta: {
        flexDirection: 'row',
        gap: Spacing.lg,
        marginBottom: Spacing.md,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
    },
    metaText: {
        ...Typography.bodySmall,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    pricePeriod: {
        fontSize: 13,
        fontWeight: 'normal',
        color: Colors.textMuted,
    },
    // Variante compacta
    compactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
    },
    compactImage: {
        width: 56,
        height: 56,
        borderRadius: BorderRadius.sm,
    },
    compactInfo: {
        flex: 1,
        marginLeft: Spacing.md,
    },
    compactName: {
        ...Typography.subtitle,
        color: Colors.textPrimary,
    },
    compactCategory: {
        ...Typography.bodySmall,
        marginTop: 2,
    },
});
