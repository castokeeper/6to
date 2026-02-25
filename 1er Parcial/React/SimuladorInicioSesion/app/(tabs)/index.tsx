import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';

const USERNAME = 'Invitado';
const GRUPO = '6to Semestre';
const ESPECIALIDAD = 'Programación';

export default function HomeScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const animValue = useRef(new Animated.Value(0)).current;

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
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={loggedIn ? 'dark-content' : 'light-content'} />

      {/* Icono de foco */}
      <Animated.View style={[styles.bulbContainer, { opacity: iconOpacity }]}>
        <Animated.Text style={[styles.bulbIcon, { color: bulbColor }]}>
          💡
        </Animated.Text>
        <Animated.Text style={[styles.statusLabel, { color: textColor }]}>
          {loggedIn ? 'Encendido' : 'Apagado'}
        </Animated.Text>
      </Animated.View>

      {/* Sección de contenido */}
      <View style={styles.userSection}>
        {loggedIn ? (
          <Animated.View style={styles.welcomeBox}>
            <Animated.Text style={[styles.welcomeLabel, { color: textColor }]}>
              ¡Bienvenido! | Luz Encendida
            </Animated.Text>
            <Text style={styles.username}>{USERNAME}</Text>
            {showInfo && (
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>📋 Grupo y Especialidad</Text>
                <Text style={styles.infoText}>{GRUPO}</Text>
                <Text style={styles.specialtyText}>{ESPECIALIDAD}</Text>
              </View>
            )}
          </Animated.View>
        ) : (
          <Animated.Text style={[styles.offlineText, { color: textColor }]}>
            Sesión no iniciada | Luz Apagada
          </Animated.Text>
        )}
      </View>

      {/* Botones */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            loggedIn ? styles.exitButton : styles.enterButton,
          ]}
          onPress={() => { setLoggedIn(!loggedIn); setShowInfo(false); }}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {loggedIn ? '🔒 Salir' : '🔓 Entrar'}
          </Text>
        </TouchableOpacity>

        {loggedIn && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.infoButton,
              showInfo && styles.buttonDisabled,
            ]}
            onPress={() => setShowInfo(true)}
            disabled={showInfo}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>❕Info</Text>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  bulbContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  bulbIcon: {
    fontSize: 80,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  userSection: {
    minHeight: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeBox: {
    alignItems: 'center',
  },
  welcomeLabel: {
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 6,
  },
  username: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4361ee',
    letterSpacing: 1,
  },
  specialtyText: {
    fontSize: 24,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#7209b7',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4361ee',
  },
  offlineText: {
    fontSize: 20,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
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
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
