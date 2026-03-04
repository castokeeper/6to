import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '@/constants/theme';
import CustomButton from '@/components/CustomButton';

export default function LoginScreen(): React.JSX.Element {
    const [matricula, setMatricula] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = (): void => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace('/home');
        }, 1200);
    };

    return (
        <LinearGradient
            colors={[Colors.primaryDark, Colors.primary, Colors.primaryLight]}
            style={styles.gradient}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Logo / Encabezado */}
                <View style={styles.header}>
                    <View style={styles.logoCircle}>
                        <Ionicons name="school" size={48} color={Colors.secondary} />
                    </View>
                    <Text style={styles.title}>Universidad</Text>
                    <Text style={styles.subtitle}>Sistema de Inscripción Institucional</Text>
                </View>

                {/* Formulario */}
                <View style={[styles.form, Shadows.large]}>
                    <Text style={styles.formTitle}>Iniciar Sesión</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Matrícula / Usuario</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} color={Colors.textMuted} />
                            <TextInput
                                style={styles.input}
                                placeholder="Ej. 20230145"
                                placeholderTextColor={Colors.textMuted}
                                value={matricula}
                                onChangeText={setMatricula}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="lock-closed-outline" size={20} color={Colors.textMuted} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                placeholderTextColor={Colors.textMuted}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <Ionicons
                                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color={Colors.textMuted}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        </View>
                    </View>

                    <CustomButton
                        title="Ingresar"
                        onPress={handleLogin}
                        type="primary"
                        size="large"
                        icon="log-in-outline"
                        loading={loading}
                        disabled={matricula.length === 0 || password.length === 0}
                        style={{ marginTop: Spacing.lg }}
                    />

                    <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xxl,
    },
    logoCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.lg,
        borderWidth: 2,
        borderColor: Colors.secondary,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.textOnPrimary,
        letterSpacing: 1,
    },
    subtitle: {
        ...Typography.body,
        color: 'rgba(255,255,255,0.7)',
        marginTop: Spacing.xs,
        textAlign: 'center',
    },
    form: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.xl,
        padding: Spacing.xl,
    },
    formTitle: {
        ...Typography.h2,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    inputGroup: {
        marginBottom: Spacing.lg,
    },
    label: {
        ...Typography.label,
        marginBottom: Spacing.sm,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.background,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.lg,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: Colors.textPrimary,
        marginLeft: Spacing.sm,
    },
    forgotText: {
        ...Typography.bodySmall,
        color: Colors.accent,
        textAlign: 'center',
        marginTop: Spacing.lg,
    },
});
