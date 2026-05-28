import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import COLORS from '../styles/colors';

export default function Radar({ cargando, estaDentro }) {
  return (
    <View style={styles.radarContainer}>
      <View style={[styles.radarOuterRing, cargando && styles.pulsingRing]}>
        <View style={styles.radarMiddleRing}>
          <View style={[styles.radarCenter, estaDentro ? styles.radarCenterSuccess : styles.radarCenterDanger]}>
            <Text style={styles.radarEmoji}>{estaDentro ? '📍' : '📡'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  radarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    marginBottom: 24,
  },
  radarOuterRing: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 1.5,
    borderColor: COLORS.indigoLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.indigoBg,
  },
  pulsingRing: {
    borderColor: COLORS.indigoPulsing,
  },
  radarMiddleRing: {
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 1.5,
    borderColor: 'rgba(99, 102, 241, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.indigoBgMiddle,
  },
  radarCenter: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  radarCenterSuccess: {
    backgroundColor: COLORS.emerald,
    shadowColor: COLORS.emerald,
  },
  radarCenterDanger: {
    backgroundColor: COLORS.red,
    shadowColor: COLORS.red,
  },
  radarEmoji: {
    fontSize: 30,
  },
});
