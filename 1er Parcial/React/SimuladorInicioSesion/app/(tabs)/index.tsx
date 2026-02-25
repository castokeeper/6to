import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const USERNAME = 'Invitado';
const GRUPO = '6to Semestre';
const ESPECIALIDAD = 'Programación';

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();

  const isSmall = width < 400;
  const isMedium = width >= 400 && width < 768;
  const scale = Math.min(width / 400, 1.4);

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: loggedIn ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [loggedIn]);

  // Interpolaciones para el fondo y colores de texto
  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1a1a2e', '#f0f4ff'],
  });

  const textColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#1a1a2e'],
  });

  const iconOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const bulbColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#555', '#ffd60a'],
  });

  return (
    <Animated.View style={[styles.outerContainer, { backgroundColor }]}>
      <StatusBar barStyle={loggedIn ? 'dark-content' : 'light-content'} />
      <SafeAreaView style={[styles.container, { paddingHorizontal: isSmall ? 16 : 30 }]}>

        {/* Icono de foco */}
        <Animated.View style={[styles.bulbContainer, { opacity: iconOpacity, marginBottom: height * 0.04 }]}>
          <Animated.Text style={[styles.bulbIcon, { fontSize: 60 * scale, color: bulbColor }]}>
            💡
          </Animated.Text>
          <Animated.Text
            style={[
              styles.statusLabel,
              { color: textColor, fontSize: Math.max(14, 16 * scale) },
            ]}
          >
            {loggedIn ? 'Encendido' : 'Apagado'}
          </Animated.Text>
        </Animated.View>

        {/* Sección de contenido */}
        <View style={[styles.userSection, { marginBottom: height * 0.04 }]}>
          {loggedIn ? (
            <Animated.View style={styles.welcomeBox}>
              <Animated.Text
                style={[
                  styles.welcomeLabel,
                  { color: textColor, fontSize: Math.max(16, 20 * scale) },
                ]}
              >
                ¡Bienvenido! | Luz Encendida
              </Animated.Text>
              <Text style={[styles.username, { fontSize: Math.max(22, 28 * scale) }]}>
                {USERNAME}
              </Text>
              {showInfo && (
                <View style={styles.infoBox}>
                  <Text style={[styles.infoLabel, { fontSize: Math.max(14, 15 * scale) }]}>
                    📋 Grupo y Especialidad
                  </Text>
                  <Text style={[styles.infoText, { fontSize: Math.max(18, 20 * scale) }]}>
                    {GRUPO}
                  </Text>
                  <Text style={[styles.specialtyText, { fontSize: Math.max(16, 18 * scale) }]}>
                    {ESPECIALIDAD}
                  </Text>
                </View>
              )}
            </Animated.View>
          ) : (
            <Animated.Text
              style={[
                styles.offlineText,
                { color: textColor, fontSize: Math.max(16, 18 * scale) },
              ]}
            >
              Sesión no iniciada | Luz Apagada
            </Animated.Text>
          )}
        </View>

        {/* Botones */}
        <View style={[styles.buttonRow, isSmall && styles.buttonColumn]}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              loggedIn ? styles.exitButton : styles.enterButton,
              {
                paddingVertical: isSmall ? 12 : 14,
                paddingHorizontal: isSmall ? 20 : 28,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            onPress={() => { setLoggedIn(!loggedIn); setShowInfo(false); }}
          >
            <Text style={[styles.buttonText, { fontSize: Math.max(15, 16 * scale) }]}>
              {loggedIn ? '🔒 Salir' : '🔓 Entrar'}
            </Text>
          </Pressable>

          {loggedIn && (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.infoButton,
                showInfo && styles.buttonDisabled,
                {
                  paddingVertical: isSmall ? 12 : 14,
                  paddingHorizontal: isSmall ? 20 : 28,
                  opacity: pressed && !showInfo ? 0.8 : 1,
                },
              ]}
              onPress={() => setShowInfo(true)}
              disabled={showInfo}
            >
              <Text style={[styles.buttonText, { fontSize: Math.max(15, 16 * scale) }]}>
                ❕Info
              </Text>
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulbContainer: {
    alignItems: 'center',
  },
  bulbIcon: {
    fontSize: 80,
  },
  statusLabel: {
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  userSection: {
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBox: {
    alignItems: 'center',
  },
  welcomeLabel: {
    fontWeight: '300',
    marginBottom: 6,
  },
  username: {
    fontWeight: 'bold',
    color: '#4361ee',
    letterSpacing: 1,
  },
  specialtyText: {
    fontWeight: '600',
    color: '#7209b7',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  infoBox: {
    marginTop: 12,
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  infoLabel: {
    fontWeight: '600',
    color: '#7209b7',
    marginBottom: 4,
  },
  infoText: {
    fontWeight: 'bold',
    color: '#4361ee',
  },
  offlineText: {
    fontStyle: 'italic',
    opacity: 0.7,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  enterButton: {
    backgroundColor: '#4361ee',
  },
  exitButton: {
    backgroundColor: '#e63946',
  },
  infoButton: {
    backgroundColor: '#7209b7',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
