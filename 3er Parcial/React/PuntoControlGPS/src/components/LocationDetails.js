import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import COLORS from '../styles/colors';

export default function LocationDetails({
  cargando,
  errorMsg,
  miLat,
  miLon,
  precision,
  diffLat,
  diffLon,
  latDestino,
  lonDestino,
  tolerance,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardHeader}>📌 Mi Ubicación (Automonitoreo Satelital)</Text>
        {cargando && !miLat ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={COLORS.indigo} />
            <Text style={styles.loadingText}>Conectando con satélites...</Text>
          </View>
        ) : errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : (
          <View style={styles.geoGrid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Latitud Actual</Text>
              <Text style={styles.gridValue}>{miLat?.toFixed(6) ?? '---'}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>Longitud Actual</Text>
              <Text style={styles.gridValue}>{miLon?.toFixed(6) ?? '---'}</Text>
            </View>
            <View style={styles.gridItemFull}>
              <Text style={styles.gridLabel}>Precisión del Sensor</Text>
              <Text style={styles.gridValueSub}>
                {precision ? `± ${precision.toFixed(1)} metros` : '---'}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>🎯 Zona Destino Activa</Text>
        <View style={styles.geoGrid}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Latitud Destino</Text>
            <Text style={styles.gridValueTarget}>{latDestino?.toFixed(6) ?? '---'}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Longitud Destino</Text>
            <Text style={styles.gridValueTarget}>{lonDestino?.toFixed(6) ?? '---'}</Text>
          </View>
        </View>

        {diffLat !== null && diffLon !== null && (
          <View style={styles.distMeta}>
            <Text style={styles.distMetaTitle}>Desviación del Punto de Control:</Text>
            <View style={styles.distRow}>
              <Text style={styles.distLabel}>Dif. Latitud:</Text>
              <Text style={[styles.distValue, diffLat < tolerance ? styles.distOk : styles.distBad]}>
                {diffLat.toFixed(6)} {diffLat < tolerance ? '(OK)' : '(Fuera)'}
              </Text>
            </View>
            <View style={styles.distRow}>
              <Text style={styles.distLabel}>Dif. Longitud:</Text>
              <Text style={[styles.distValue, diffLon < tolerance ? styles.distOk : styles.distBad]}>
                {diffLon.toFixed(6)} {diffLon < tolerance ? '(OK)' : '(Fuera)'}
              </Text>
            </View>
            <Text style={styles.distInfo}>
              * Margen máximo permitido de diferencia: {tolerance} (~500m).
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.slate300,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 6,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  loadingText: {
    color: COLORS.slate400,
    marginLeft: 8,
    fontSize: 13,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 8,
  },
  geoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  gridItemFull: {
    width: '100%',
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.slate500,
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.slate5,
  },
  gridValueSub: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.sky,
  },
  gridValueTarget: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.amber,
  },
  distMeta: {
    marginTop: 12,
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.5,
    borderColor: COLORS.border,
  },
  distMetaTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.slate400,
    marginBottom: 6,
  },
  distRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  distLabel: {
    fontSize: 12,
    color: COLORS.slate300,
  },
  distValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  distOk: {
    color: COLORS.emeraldText,
  },
  distBad: {
    color: COLORS.redText,
  },
  distInfo: {
    fontSize: 9.5,
    color: COLORS.slate500,
    fontStyle: 'italic',
    marginTop: 6,
    lineHeight: 12,
  },
});
