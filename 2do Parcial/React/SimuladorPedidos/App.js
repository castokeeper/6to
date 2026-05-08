import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ESTADO = {
  INICIAL: 'inicial',
  CARGANDO: 'cargando',
  LISTO: 'listo',
};

export default function App() {
  const [estado, setEstado] = useState(ESTADO.INICIAL);

  const hacerPedido = () => {
    setEstado(ESTADO.CARGANDO);
    setTimeout(() => {
      setEstado(ESTADO.LISTO);
    }, 3000);
  };

  const reiniciar = () => {
    setEstado(ESTADO.INICIAL);
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.titulo}>🍔 Simulador de Pedidos</Text>

      {/* ── Estado: INICIAL ── */}
      {estado === ESTADO.INICIAL && (
        <View style={styles.seccion}>
          <Text style={styles.descripcion}>
            Presiona el botón para realizar tu pedido.
          </Text>
          <TouchableOpacity style={styles.boton} onPress={hacerPedido}>
            <Text style={styles.botonTexto}>Hacer un pedido</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Estado: CARGANDO ── */}
      {estado === ESTADO.CARGANDO && (
        <View style={styles.seccion}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.cargandoTexto}>Preparando tu pedido…</Text>
        </View>
      )}

      {/* ── Estado: LISTO ── */}
      {estado === ESTADO.LISTO && (
        <View style={styles.seccion}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.listoTexto}>¡Tu pedido está listo!</Text>
          <TouchableOpacity style={styles.botonReiniciar} onPress={reiniciar}>
            <Text style={styles.botonTexto}>Hacer otro pedido</Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 40,
    textAlign: 'center',
  },
  seccion: {
    alignItems: 'center',
    gap: 20,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  boton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  botonReiniciar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cargandoTexto: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 12,
  },
  emoji: {
    fontSize: 64,
  },
  listoTexto: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center',
  },
});
