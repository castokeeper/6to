import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { CAREERS } from '@/data/careers';
import CustomButton from '@/components/CustomButton';

export default function DetailScreen(): React.JSX.Element {
    const { id } = useLocalSearchParams<{ id: string }>();
    const career = CAREERS.find((c) => c.id === id);

    if (!career) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Carrera no encontrada</Text>
                <CustomButton title="Regresar" onPress={() => router.back()} type="outline" />
            </View>
        );
    }

    const handleEnroll = (): void => {
        Alert.alert(
            'Trámite Iniciado',
            `Tu solicitud para ${career.name} ha sido registrada. Revisa tu perfil para dar seguimiento.`,
            [{ text: 'Ver perfil', onPress: () => router.push('/profile') }, { text: 'Aceptar' }]
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Imagen principal */}
            <View style={styles.imageWrapper}>
                <Image source={{ uri: career.image }} style={styles.image} />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.imageOverlay}
                />
                <View style={styles.imageTextContainer}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{career.category}</Text>
                    </View>
                    <Text style={styles.imageTitle}>{career.name}</Text>
                </View>
            </View>

            {/* Info rápida */}
            <View style={styles.quickInfo}>
                <View style={styles.quickItem}>
                    <Ionicons name="time-outline" size={22} color={Colors.primary} />
                    <Text style={styles.quickLabel}>Duración</Text>
                    <Text style={styles.quickValue}>{career.duration}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.quickItem}>
                    <Ionicons name="location-outline" size={22} color={Colors.primary} />
                    <Text style={styles.quickLabel}>Modalidad</Text>
                    <Text style={styles.quickValue}>{career.modality}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.quickItem}>
                    <Ionicons name="cash-outline" size={22} color={Colors.primary} />
                    <Text style={styles.quickLabel}>Cuota</Text>
                    <Text style={styles.quickValue}>${career.price.toLocaleString('es-MX')}</Text>
                </View>
            </View>

            {/* Descripción */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Descripción del Programa</Text>
                <Text style={styles.description}>{career.description}</Text>
            </View>

            {/* Destacados */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>¿Por qué elegirnos?</Text>
                {career.highlights.map((item: string, idx: number) => (
                    <View key={idx} style={styles.highlightRow}>
                        <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
                        <Text style={styles.highlightText}>{item}</Text>
                    </View>
                ))}
            </View>

            {/* Precio y Botón */}
            <View style={[styles.ctaCard, Shadows.medium]}>
                <View>
                    <Text style={styles.ctaLabel}>Cuota por semestre</Text>
                    <Text style={styles.ctaPrice}>
                        ${career.price.toLocaleString('es-MX')} MXN
                    </Text>
                </View>
                <CustomButton
                    title="Iniciar Trámite"
                    onPress={handleEnroll}
                    type="primary"
                    icon="document-text-outline"
                    style={{ flex: 1, marginLeft: Spacing.lg }}
                />
            </View>

            <View style={{ height: Spacing.xxl }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: Spacing.lg,
    },
    errorText: {
        ...Typography.h3,
        color: Colors.textMuted,
    },
    imageWrapper: {
        position: 'relative',
        height: 320,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 180,
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: Spacing.xl,
        left: Spacing.xl,
        right: Spacing.xl,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.secondary,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.sm,
        marginBottom: Spacing.sm,
    },
    badgeText: {
        ...Typography.bodySmall,
        color: Colors.textOnSecondary,
        fontWeight: '700',
    },
    imageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textOnPrimary,
        lineHeight: 30,
    },
    quickInfo: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        marginHorizontal: Spacing.xl,
        marginTop: -Spacing.xl,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        ...Shadows.medium,
    },
    quickItem: {
        flex: 1,
        alignItems: 'center',
        gap: Spacing.xs,
    },
    quickLabel: {
        ...Typography.bodySmall,
        color: Colors.textMuted,
    },
    quickValue: {
        ...Typography.subtitle,
        color: Colors.textPrimary,
        fontSize: 13,
        textAlign: 'center',
    },
    divider: {
        width: 1,
        backgroundColor: Colors.border,
    },
    section: {
        paddingHorizontal: Spacing.xl,
        marginTop: Spacing.xl,
    },
    sectionTitle: {
        ...Typography.h3,
        marginBottom: Spacing.md,
    },
    description: {
        ...Typography.body,
        lineHeight: 24,
    },
    highlightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        marginBottom: Spacing.md,
    },
    highlightText: {
        ...Typography.body,
        flex: 1,
    },
    ctaCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        marginHorizontal: Spacing.xl,
        marginTop: Spacing.xl,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
    },
    ctaLabel: {
        ...Typography.bodySmall,
        color: Colors.textMuted,
    },
    ctaPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
});
