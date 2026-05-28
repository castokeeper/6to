import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [ladoCamara, setLadoCamara] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  const alternarCamara = () => {
    setLadoCamara((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  if (!permission) {
    return (
      <View style={styles.containerCentrado}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.textoCargando}>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.containerCentrado}>
        <View style={styles.tarjetaPermiso}>
          <Text style={styles.tituloPermiso}>Acceso a la Cámara</Text>
          <Text style={styles.descripcionPermiso}>
            Esta aplicación requiere acceso a tu cámara para poder capturar imágenes y alternar entre los lentes disponibles.
          </Text>
          <TouchableOpacity style={styles.btnPermiso} onPress={requestPermission}>
            <Text style={styles.btnPermisoTexto}>Otorgar Permiso</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cámara Inteligente</Text>
        <Text style={styles.headerSubtitle}>
          LENTE ACTIVO: {ladoCamara === 'back' ? 'TRASERO (BACK)' : 'FRONTAL (FRONT)'}
        </Text>
      </View>

      <View style={styles.camaraContainer}>
        <CameraView style={styles.camara} facing={ladoCamara}>
          <View style={styles.indicadorFlotante}>
            <Text style={styles.indicadorTexto}>
              {ladoCamara === 'back' ? '📸 Lente Trasero (Back)' : '🤳 Lente Frontal (Front)'}
            </Text>
          </View>
        </CameraView>
      </View>

      <View style={styles.controlPanel}>
        {/* Botón único inteligente centrado que detecta el estado y hace el toggle */}
        <TouchableOpacity
          style={styles.botonInteligente}
          onPress={alternarCamara}
          activeOpacity={0.8}
        >
          <Text style={styles.botonEmoji}>🔄</Text>
          <Text style={styles.botonTexto}>Girar Cámara</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  containerCentrado: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  textoCargando: {
    color: '#94a3b8',
    fontSize: 15,
    marginTop: 12,
    fontWeight: '600',
  },
  tarjetaPermiso: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  tituloPermiso: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 12,
  },
  descripcionPermiso: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  btnPermiso: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  btnPermisoTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#38bdf8',
    marginTop: 6,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  camaraContainer: {
    flex: 1,
    margin: 16,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#334155',
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  camara: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  indicadorFlotante: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: '#334155',
  },
  indicadorTexto: {
    color: '#f1f5f9',
    fontSize: 12,
    fontWeight: '600',
  },
  controlPanel: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 24,
  },
  botonInteligente: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  botonEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
