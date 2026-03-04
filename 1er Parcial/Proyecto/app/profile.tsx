import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import { MOCK_USER } from '@/data/user';
import ProgressBar from '@/components/ProgressBar';
import CustomButton from '@/components/CustomButton';

export default function ProfileScreen(): React.JSX.Element {
    const user = MOCK_USER;

    const statusConfig: Record<string, { label: string; color: string; bg: string; icon: keyof typeof Ionicons.glyphMap }> = {
        pendiente: { label: 'Pendiente', color: Colors.warning, bg: Colors.warningLight, icon: 'hourglass-outline' },
        en_proceso: { label: 'En Proceso', color: Colors.info, bg: Colors.infoLight, icon: 'sync-outline' },
        completado: { label: 'Completado', color: Colors.success, bg: Colors.successLight, icon: 'checkmark-circle-outline' },
        rechazado: { label: 'Rechazado', color: Colors.error, bg: Colors.errorLight, icon: 'close-circle-outline' },
    };

    const currentStatus = statusConfig[user.enrollmentStatus];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Tarjeta de perfil */}
                <View style={[styles.profileCard, Shadows.medium]}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View style={styles.infoRow}>
                        <View style={styles.infoPill}>
                            <Ionicons name="id-card-outline" size={16} color={Colors.primary} />
                            <Text style={styles.infoPillText}>{user.matricula}</Text>
                        </View>
                        <View style={styles.infoPill}>
                            <Ionicons name="school-outline" size={16} color={Colors.primary} />
                            <Text style={styles.infoPillText}>Semestre {user.semester}</Text>
                        </View>
                    </View>
                    <Text style={styles.careerName}>{user.career}</Text>
                </View>

                {/* Estado del trámite */}
                <View style={[styles.statusCard, Shadows.small]}>
                    <View style={styles.statusHeader}>
                        <Text style={styles.sectionTitle}>Estado de Inscripción</Text>
                        <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
                            <Ionicons name={currentStatus.icon} size={16} color={currentStatus.color} />
                            <Text style={[styles.statusLabel, { color: currentStatus.color }]}>
                                {currentStatus.label}
                            </Text>
                        </View>
                    </View>

                    <ProgressBar percentage={user.progress} />

                    {/* Verificación de pago */}
                    <View style={[styles.paymentRow, {
                        backgroundColor: user.paymentVerified ? Colors.successLight : Colors.warningLight,
                    }]}>
                        <Ionicons
                            name={user.paymentVerified ? 'checkmark-circle' : 'alert-circle'}
                            size={22}
                            color={user.paymentVerified ? Colors.success : Colors.warning}
                        />
                        <Text style={[styles.paymentText, {
                            color: user.paymentVerified ? Colors.success : Colors.warning,
                        }]}>
                            {user.paymentVerified ? 'Pago verificado' : 'Pago pendiente de verificación'}
                        </Text>
                    </View>
                </View>

                {/* Pasos del trámite */}
                <View style={[styles.stepsCard, Shadows.small]}>
                    <Text style={styles.sectionTitle}>Seguimiento del Trámite</Text>

                    {user.enrollmentSteps.map((step, idx) => (
                        <View key={step.id} style={styles.stepRow}>
                            <View style={styles.stepIndicator}>
                                <View style={[
                                    styles.stepDot,
                                    { backgroundColor: step.completed ? Colors.success : Colors.border },
                                ]}>
                                    {step.completed && (
                                        <Ionicons name="checkmark" size={14} color={Colors.textOnPrimary} />
                                    )}
                                </View>
                                {idx < user.enrollmentSteps.length - 1 && (
                                    <View style={[
                                        styles.stepLine,
                                        { backgroundColor: step.completed ? Colors.success : Colors.border },
                                    ]} />
                                )}
                            </View>
                            <View style={styles.stepContent}>
                                <Text style={[
                                    styles.stepTitle,
                                    !step.completed && { color: Colors.textMuted },
                                ]}>
                                    {step.title}
                                </Text>
                                <Text style={styles.stepDesc}>{step.description}</Text>
                                {step.date && (
                                    <Text style={styles.stepDate}>{step.date}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Botón cerrar sesión */}
                <CustomButton
                    title="Cerrar Sesión"
                    onPress={() => router.replace('/')}
                    type="outline"
                    icon="log-out-outline"
                    style={{ marginHorizontal: Spacing.xl, marginTop: Spacing.lg }}
                />

                <View style={{ height: Spacing.xxxl }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    profileCard: {
        backgroundColor: Colors.surface,
        margin: Spacing.xl,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: Colors.secondary,
        marginBottom: Spacing.md,
    },
    userName: {
        ...Typography.h2,
        textAlign: 'center',
    },
    userEmail: {
        ...Typography.bodySmall,
        color: Colors.textMuted,
        marginTop: Spacing.xs,
    },
    infoRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.lg,
    },
    infoPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        backgroundColor: Colors.background,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderRadius: BorderRadius.full,
    },
    infoPillText: {
        ...Typography.bodySmall,
        color: Colors.textSecondary,
        fontWeight: '600',
    },
    careerName: {
        ...Typography.subtitle,
        color: Colors.primary,
        textAlign: 'center',
        marginTop: Spacing.lg,
    },
    statusCard: {
        backgroundColor: Colors.surface,
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
        marginBottom: Spacing.lg,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    sectionTitle: {
        ...Typography.h3,
        fontSize: 18,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.xs,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.xs,
        borderRadius: BorderRadius.full,
    },
    statusLabel: {
        ...Typography.buttonSmall,
        fontSize: 12,
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        marginTop: Spacing.lg,
    },
    paymentText: {
        ...Typography.body,
        fontWeight: '600',
        fontSize: 14,
    },
    stepsCard: {
        backgroundColor: Colors.surface,
        marginHorizontal: Spacing.xl,
        borderRadius: BorderRadius.lg,
        padding: Spacing.xl,
    },
    stepRow: {
        flexDirection: 'row',
        marginTop: Spacing.lg,
    },
    stepIndicator: {
        alignItems: 'center',
        marginRight: Spacing.lg,
    },
    stepDot: {
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepLine: {
        width: 2,
        flex: 1,
        marginTop: Spacing.xs,
    },
    stepContent: {
        flex: 1,
        paddingBottom: Spacing.lg,
    },
    stepTitle: {
        ...Typography.subtitle,
        color: Colors.textPrimary,
        fontSize: 15,
    },
    stepDesc: {
        ...Typography.bodySmall,
        marginTop: Spacing.xs,
    },
    stepDate: {
        ...Typography.bodySmall,
        color: Colors.accent,
        marginTop: Spacing.xs,
        fontSize: 12,
    },
});
