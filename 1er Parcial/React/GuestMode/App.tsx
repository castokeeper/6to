import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native';

const App: React.FC = () => {
    // Estado para controlar la visibilidad de la información personal
    const [verInfo, setVerInfo] = useState<boolean>(false);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* ═══ Título ═══ */}
            <Text style={styles.emoji}>🔒</Text>
            <Text style={styles.titulo}>Modo Invitado</Text>
            <Text style={styles.subtitulo}>
                Tu información personal está protegida
            </Text>

            {/* ═══ Botón "Mostrar mis datos" ═══ */}
            {!verInfo && (
                <TouchableOpacity
                    style={styles.botonMostrar}
                    onPress={() => setVerInfo(true)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.botonMostrarTexto}>👁 Mostrar mis datos</Text>
                </TouchableOpacity>
            )}

            {/* ═══ Contenido Condicional — Solo visible si verInfo === true ═══ */}
            {verInfo && (
                <View style={styles.cuadroInfo}>
                    <Text style={styles.infoTitulo}>📋 Mis Datos</Text>

                    <View style={styles.datoRow}>
                        <Text style={styles.datoLabel}>Nombre:</Text>
                        <Text style={styles.datoValor}>Edgar Antonio Venegas Bazán</Text>
                    </View>

                    <View style={styles.datoRow}>
                        <Text style={styles.datoLabel}>Grupo:</Text>
                        <Text style={styles.datoValor}>6to Programación</Text>
                    </View>

                    <View style={styles.separador} />

                    <Text style={styles.frase}>
                        &quot;He aprendido a crear componentes reutilizables, manejar estados
                        con useState y diseñar interfaces dinámicas con React Native.&quot;
                    </Text>

                    {/* ═══ Botón "Ocultar" ═══ */}
                    <TouchableOpacity
                        style={styles.botonOcultar}
                        onPress={() => setVerInfo(false)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.botonOcultarTexto}>🔒 Ocultar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D1A',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },

    // ── Encabezado ──
    emoji: {
        fontSize: 56,
        marginBottom: 12,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitulo: {
        fontSize: 14,
        color: '#888899',
        marginBottom: 40,
        textAlign: 'center',
    },

    // ── Botón Mostrar ──
    botonMostrar: {
        backgroundColor: '#8A2BE2',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowColor: '#8A2BE2',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
            },
            android: {
                elevation: 8,
            },
            web: {
                shadowColor: '#8A2BE2',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
            },
        }),
    },
    botonMostrarTexto: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },

    // ── Cuadro de información ──
    cuadroInfo: {
        backgroundColor: '#1A1A2E',
        borderRadius: 20,
        padding: 24,
        width: '90%',
        maxWidth: 360,
        borderWidth: 1,
        borderColor: '#2A2A4A',
        ...Platform.select({
            ios: {
                shadowColor: '#8A2BE2',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
            },
            android: {
                elevation: 10,
            },
            web: {
                shadowColor: '#8A2BE2',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
            },
        }),
    },
    infoTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },

    // ── Fila de dato ──
    datoRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    datoLabel: {
        fontSize: 15,
        color: '#888899',
        fontWeight: '600',
        width: 80,
    },
    datoValor: {
        fontSize: 15,
        color: '#FFFFFF',
        flex: 1,
    },

    // ── Separador ──
    separador: {
        height: 1,
        backgroundColor: '#2A2A4A',
        marginVertical: 16,
    },

    // ── Frase ──
    frase: {
        fontSize: 14,
        color: '#AAAACC',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },

    // ── Botón Ocultar ──
    botonOcultar: {
        backgroundColor: '#333355',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        alignSelf: 'center',
    },
    botonOcultarTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
