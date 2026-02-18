import React from 'react';
import {
  View,
  Text,
  Pressable,
  Alert,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

export default function PerfilScreen() {
  const { width, height } = useWindowDimensions();
  const isSmall = width < 480;

  return (
    <View style={styles.contenedor}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Encabezado (flex: 1) */}
      <View style={styles.encabezado}>
        <Text style={[styles.nombre, isSmall && { fontSize: 18 }]}>
          Edgar Antonio Venegas Bazán
        </Text>
        <Text style={styles.subtitulo}>Desarrollador Web • Estudiante</Text>
      </View>

      {/* Contenido Principal (flex: 4) */}
      <View style={[styles.contenido, isSmall && { paddingHorizontal: 16 }]}>
        <Text style={[styles.titulo, isSmall && { fontSize: 22 }]}>Sobre mí</Text>
        <View style={styles.lineaDecorativa} />
        <Text style={[styles.parrafo, isSmall && { fontSize: 14, lineHeight: 22 }]}>
          Lo que más me apasiona de la programación es la capacidad de convertir
          una idea en algo tangible y funcional. Disfruto especialmente el desarrollo
          frontend, donde cada línea de código se traduce en una experiencia visual
          que los usuarios pueden ver y sentir. En mi tiempo libre me gusta explorar
          nuevas tecnologías, resolver retos de lógica y diseñar interfaces que sean
          tanto elegantes como intuitivas. Para mí, programar no es solo escribir
          código; es un acto creativo que combina arte y lógica en cada proyecto.
        </Text>
      </View>

      {/* Pie de Página (flex: 1.5) — botones simétricos */}
      <View style={styles.pie}>
        <Pressable
          style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
          onPress={() => Alert.alert('Grupo', '6-A')}
        >
          <Text style={[styles.botonTexto, isSmall && { fontSize: 12 }]}>
            Grupo: 6-A
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
          onPress={() => Alert.alert('Especialidad', 'Desarrollo Web')}
        >
          <Text style={[styles.botonTexto, isSmall && { fontSize: 12 }]}>
            Especialidad: Móviles
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
  },

  encabezado: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  nombre: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e0e0e0',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    fontWeight: '300',
    color: '#8a8aaf',
    marginTop: 6,
    letterSpacing: 0.5,
  },

  contenido: {
    flex: 4,
    backgroundColor: '#f4f6fb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 10,
  },

  lineaDecorativa: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e94560',
    marginBottom: 18,
  },

  parrafo: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 26,
    color: '#4a4a6a',
    textAlign: 'center',
    maxWidth: 600,
  },

  pie: {
    flex: 1.5,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },

  boton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  botonPresionado: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },

  botonTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
