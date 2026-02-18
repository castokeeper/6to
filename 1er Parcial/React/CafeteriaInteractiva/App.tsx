import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

/** Dimensiones de un teléfono Android típico */
const PHONE_WIDTH = 360;
const PHONE_HEIGHT = 740;

/** Punto de entrada de la aplicación – envuelve en frame de teléfono en web */
export default function App(): React.JSX.Element {
  if (Platform.OS === 'web') {
    return (
      <View style={webStyles.background}>
        {/* Marco del teléfono */}
        <View style={webStyles.phoneFrame}>
          {/* Barra de estado Android */}
          <View style={webStyles.statusBar}>
            <Text style={webStyles.statusTime}>9:41</Text>
            <View style={webStyles.statusIcons}>
              <Text style={webStyles.statusIcon}>📶</Text>
              <Text style={webStyles.statusIcon}>🔋</Text>
            </View>
          </View>

          {/* Contenido de la app */}
          <View style={webStyles.appContent}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </View>

          {/* Barra de navegación Android */}
          <View style={webStyles.navBar}>
            <View style={webStyles.navPill} />
          </View>
        </View>
      </View>
    );
  }

  // En dispositivos nativos, sin frame
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const webStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: PHONE_HEIGHT + 80,
  },
  phoneFrame: {
    width: PHONE_WIDTH,
    height: PHONE_HEIGHT,
    backgroundColor: '#F5F0E8',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#2D2D2D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 20,
  },
  statusBar: {
    height: 28,
    backgroundColor: '#F5F0E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  statusTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 6,
  },
  statusIcon: {
    fontSize: 10,
  },
  appContent: {
    flex: 1,
    overflow: 'hidden',
  },
  navBar: {
    height: 20,
    backgroundColor: '#F5F0E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navPill: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2D2D2D',
  },
});
