import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Menu'>;

/** Dimensiones fijas de teléfono Android */
const width = 360;
const height = 692;

/** Pantalla principal del menú de la cafetería */
export default function MenuScreen({ navigation }: Props): React.JSX.Element {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F0E8" />

            {/* Título */}
            <Text style={styles.title}>Cafetería Escolar</Text>
            <Text style={styles.subtitle}>¡Tu comida favorita te espera!</Text>

            {/* Tarjeta principal */}
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    {/* Bloque visual representando comida */}
                    <View style={styles.foodVisual}>
                        <Text style={styles.foodEmoji}>🍔</Text>
                        <Text style={styles.foodEmoji}>🍟</Text>
                        <Text style={styles.foodEmoji}>🥤</Text>
                        <Text style={styles.foodEmoji}>🍎</Text>
                    </View>
                    <View style={styles.foodLabelContainer}>
                        <Text style={styles.foodLabel}>Combo Escolar</Text>
                        <Text style={styles.foodDescription}>
                            Hamburguesa + Papas + Bebida + Fruta
                        </Text>
                    </View>
                </View>

                {/* Información del precio */}
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Precio</Text>
                    <Text style={styles.priceValue}>$45.00</Text>
                </View>

                {/* Tiempo estimado */}
                <View style={styles.timeRow}>
                    <Text style={styles.timeIcon}>⏱️</Text>
                    <Text style={styles.timeText}>Listo en 10 min</Text>
                </View>
            </View>

            {/* Botón PEDIR AHORA */}
            <TouchableOpacity
                style={styles.orderButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Confirmation')}
            >
                <Text style={styles.orderButtonText}>PEDIR AHORA</Text>
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
    title: {
        fontSize: width * 0.08,
        fontWeight: '800',
        color: '#2D2D2D',
        marginBottom: height * 0.005,
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#888888',
        marginBottom: height * 0.04,
        fontWeight: '400',
    },
    card: {
        width: width * 0.85,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: width * 0.06,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
        marginBottom: height * 0.04,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    foodVisual: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8F0',
        borderRadius: 16,
        width: '100%',
        paddingVertical: height * 0.03,
        marginBottom: height * 0.015,
    },
    foodEmoji: {
        fontSize: width * 0.1,
        marginHorizontal: width * 0.02,
    },
    foodLabelContainer: {
        alignItems: 'center',
    },
    foodLabel: {
        fontSize: width * 0.055,
        fontWeight: '700',
        color: '#2D2D2D',
    },
    foodDescription: {
        fontSize: width * 0.033,
        color: '#999999',
        marginTop: height * 0.005,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: height * 0.015,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        marginBottom: height * 0.01,
    },
    priceLabel: {
        fontSize: width * 0.04,
        color: '#888888',
        fontWeight: '500',
    },
    priceValue: {
        fontSize: width * 0.06,
        fontWeight: '800',
        color: '#4CAF50',
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeIcon: {
        fontSize: width * 0.04,
        marginRight: width * 0.02,
    },
    timeText: {
        fontSize: width * 0.035,
        color: '#AAAAAA',
        fontWeight: '400',
    },
    orderButton: {
        backgroundColor: '#4CAF50',
        width: width * 0.85,
        paddingVertical: height * 0.02,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    orderButtonText: {
        color: '#FFFFFF',
        fontSize: width * 0.045,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
});
