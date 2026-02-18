import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

/** Dimensiones fijas de teléfono Android */
const width = 360;
const height = 692;

/** Pantalla de confirmación del pedido */
export default function ConfirmationScreen({ navigation }: Props): React.JSX.Element {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F0E8" />

            {/* Círculo OK */}
            <View style={styles.okCircle}>
                <Text style={styles.okText}>OK</Text>
            </View>

            {/* Mensaje de confirmación */}
            <Text style={styles.confirmTitle}>¡Pedido recibido!</Text>
            <Text style={styles.confirmMessage}>
                Pasa por él en 10 minutos
            </Text>

            {/* Indicador de tiempo */}
            <View style={styles.timerContainer}>
                <Text style={styles.timerIcon}>⏱️</Text>
                <Text style={styles.timerText}>10:00 min</Text>
            </View>

            {/* Botón VOLVER AL INICIO */}
            <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.8}
                onPress={() => navigation.popToTop()}
            >
                <Text style={styles.backButtonText}>VOLVER AL INICIO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F0E8',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: width * 0.07,
    },
    okCircle: {
        width: width * 0.35,
        height: width * 0.35,
        borderRadius: width * 0.175,
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.04,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 8,
    },
    okText: {
        fontSize: width * 0.12,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: 2,
    },
    confirmTitle: {
        fontSize: width * 0.07,
        fontWeight: '800',
        color: '#2D2D2D',
        marginBottom: height * 0.01,
    },
    confirmMessage: {
        fontSize: width * 0.042,
        color: '#888888',
        textAlign: 'center',
        marginBottom: height * 0.03,
        fontWeight: '400',
        lineHeight: width * 0.06,
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.015,
        borderRadius: 12,
        marginBottom: height * 0.06,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    timerIcon: {
        fontSize: width * 0.05,
        marginRight: width * 0.02,
    },
    timerText: {
        fontSize: width * 0.045,
        fontWeight: '700',
        color: '#4CAF50',
    },
    backButton: {
        backgroundColor: '#2D2D2D',
        width: width * 0.85,
        paddingVertical: height * 0.02,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.04,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
});
