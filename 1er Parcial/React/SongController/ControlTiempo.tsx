import React from 'react';
import { View, StyleSheet } from 'react-native';

// Props del componente — variante de progreso y color configurable (efecto espejo)
interface ControlTiempoProps {
    progreso: '50%' | '100%';
    colorBarra?: string; // Color de la barra de progreso (default: púrpura #8A2BE2)
}

const ANCHO_TOTAL = 300;
const ALTO_BARRA = 6;
const TAMANO_INDICADOR = 16;

const ControlTiempo: React.FC<ControlTiempoProps> = ({
    progreso,
    colorBarra = '#8A2BE2',
}) => {
    const anchoProgreso = progreso === '100%' ? ANCHO_TOTAL : ANCHO_TOTAL / 2;

    return (
        <View style={styles.contenedor}>
            {/* Barra_Fondo — El riel base */}
            <View style={styles.barraFondo} />

            {/* Barra_Progreso — El avance */}
            <View
                style={[
                    styles.barraProgreso,
                    {
                        width: anchoProgreso,
                        backgroundColor: colorBarra,
                    },
                ]}
            />

            {/* Indicador_Punto — El punto de control con sombra proyectada */}
            <View
                style={[
                    styles.indicadorPunto,
                    {
                        left: anchoProgreso - TAMANO_INDICADOR / 2,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        width: ANCHO_TOTAL,
        height: TAMANO_INDICADOR,
        justifyContent: 'center',
    },
    barraFondo: {
        position: 'absolute',
        width: ANCHO_TOTAL,
        height: ALTO_BARRA,
        borderRadius: 10,
        backgroundColor: '#333333',
    },
    barraProgreso: {
        position: 'absolute',
        height: ALTO_BARRA,
        borderRadius: 10,
    },
    indicadorPunto: {
        position: 'absolute',
        width: TAMANO_INDICADOR,
        height: TAMANO_INDICADOR,
        borderRadius: TAMANO_INDICADOR / 2,
        backgroundColor: '#FFFFFF',
        // Sombra proyectada (shadow)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Android shadow
    },
});

export default ControlTiempo;
