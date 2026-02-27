import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import ControlTiempo from './ControlTiempo';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const albumCover = require('./assets/album_cover.png');

const App: React.FC = () => {
  // Estado para la variante de progreso (50% o 100%)
  const [progreso, setProgreso] = useState<'50%' | '100%'>('50%');

  // Estado para el color de la barra — "Efecto Espejo"
  // Cambiar este color aquí afecta automáticamente el componente en la pantalla
  const [colorBarra, setColorBarra] = useState<string>('#8A2BE2');

  // Toggle de progreso
  const toggleProgreso = () => {
    setProgreso((prev) => (prev === '50%' ? '100%' : '50%'));
  };

  // "Efecto Espejo" — cambiar color de la barra dinámicamente
  const toggleColor = () => {
    setColorBarra((prev) => (prev === '#8A2BE2' ? '#39FF14' : '#8A2BE2'));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* ═══ Portada_Album ═══ */}
      <View style={styles.portadaContenedor}>
        <Image source={albumCover} style={styles.portadaAlbum} />
      </View>

      {/* ═══ Nombre_Cancion y Artista ═══ */}
      <Text style={styles.nombreCancion}>Midnight Echoes</Text>
      <Text style={styles.artista}>Neon Pulse</Text>

      {/* ═══ Control_Tiempo_Master ═══ */}
      <View style={styles.controlTiempoContenedor}>
        <ControlTiempo progreso={progreso} colorBarra={colorBarra} />
      </View>

      {/* ═══ Tiempos ═══ */}
      <View style={styles.tiemposContenedor}>
        <Text style={styles.tiempo}>1:45</Text>
        <Text style={styles.tiempo}>4:20</Text>
      </View>

      {/* ═══ Botones de Control ═══ */}
      <View style={styles.botonesContenedor}>
        <TouchableOpacity style={styles.botonSecundario}>
          <Text style={styles.botonIcono}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonPlay}
          onPress={toggleProgreso}
        >
          <Text style={styles.botonPlayIcono}>
            {progreso === '100%' ? '⏸' : '▶'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonSecundario}>
          <Text style={styles.botonIcono}>⏭</Text>
        </TouchableOpacity>
      </View>

      {/* ═══ Botón Efecto Espejo ═══ */}
      <TouchableOpacity style={styles.botonEspejo} onPress={toggleColor}>
        <Text style={styles.botonEspejoTexto}>
          ✨ Efecto Espejo (Cambiar Color)
        </Text>
      </TouchableOpacity>

      {/* ═══ Indicador de variante actual ═══ */}
      <Text style={styles.varianteTexto}>Progreso: {progreso}</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  // ── Portada ──
  portadaContenedor: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  portadaAlbum: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },

  // ── Información de canción ──
  nombreCancion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  artista: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 24,
  },

  // ── Control de tiempo ──
  controlTiempoContenedor: {
    marginBottom: 8,
  },

  // ── Tiempos ──
  tiemposContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginBottom: 32,
  },
  tiempo: {
    fontSize: 12,
    color: '#999999',
  },

  // ── Botones de control ──
  botonesContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 32,
  },
  botonSecundario: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonIcono: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  botonPlay: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  botonPlayIcono: {
    fontSize: 28,
    color: '#FFFFFF',
  },

  // ── Efecto Espejo ──
  botonEspejo: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    marginBottom: 12,
  },
  botonEspejoTexto: {
    color: '#8A2BE2',
    fontSize: 14,
  },

  // ── Variante ──
  varianteTexto: {
    color: '#666666',
    fontSize: 12,
  },
});
