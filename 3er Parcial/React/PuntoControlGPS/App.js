import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  SafeAreaView
} from 'react-native';
import COLORS from './src/styles/colors';
import useGPS from './src/hooks/useGPS';
import Radar from './src/components/Radar';
import StatusCard from './src/components/StatusCard';
import LocationDetails from './src/components/LocationDetails';

export default function App() {
  const {
    estatusEscuela,
    cargando,
    errorMsg,
    miLat,
    miLon,
    precision,
    diffLat,
    diffLon,
    estaDentro,
    latDestino,
    lonDestino,
    tolerance,
    fijarUbicacionActualComoDestino,
  } = useGPS();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Punto de Control GPS</Text>
          <Text style={styles.headerSubtitle}>Validación de Geocerca Automática</Text>
        </View>

        <Radar cargando={cargando} estaDentro={estaDentro} />

        <StatusCard estaDentro={estaDentro} estatusEscuela={estatusEscuela} />

        <LocationDetails
          cargando={cargando}
          errorMsg={errorMsg}
          miLat={miLat}
          miLon={miLon}
          precision={precision}
          diffLat={diffLat}
          diffLon={diffLon}
          latDestino={latDestino}
          lonDestino={lonDestino}
          tolerance={tolerance}
        />

        {/* Botón dinámico para fijar la ubicación actual como punto de control */}
        <TouchableOpacity
          style={[styles.btnSetDestino, (cargando || miLat === null) && styles.btnDisabled]}
          onPress={fijarUbicacionActualComoDestino}
          disabled={cargando || miLat === null}
          activeOpacity={0.8}
        >
          <Text style={styles.btnSetDestinoText}>📍 Usar Ubicación Actual como Destino</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Práctica de Geolocalización Real</Text>
          <Text style={styles.footerSubText}>Desarrollo de Aplicaciones Móviles</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.slate50,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.slate400,
    marginTop: 4,
  },
  btnSetDestino: {
    width: '100%',
    backgroundColor: COLORS.indigo,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
    shadowColor: COLORS.indigo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  btnDisabled: {
    backgroundColor: COLORS.grayDisabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnSetDestinoText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.slate600,
    fontWeight: '600',
  },
  footerSubText: {
    fontSize: 10,
    color: COLORS.border,
    marginTop: 2,
  },
});
