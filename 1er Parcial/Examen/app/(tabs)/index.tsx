import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function CalculadoraDescuento() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descuento, setDescuento] = useState('');
  const [resultado, setResultado] = useState<{
    nombreProducto: string;
    precioOriginal: number;
    porcentaje: number;
    ahorro: number;
    precioFinal: number;
  } | null>(null);

  const calcular = () => {
    if (!nombre.trim() || !precio.trim() || !descuento.trim()) {
      Alert.alert(
        'Campos vacíos',
        'Por favor, completa todos los campos antes de calcular.'
      );
      return;
    }

    const precioNum = parseFloat(precio);
    const descuentoNum = parseFloat(descuento);

    if (isNaN(precioNum) || isNaN(descuentoNum)) {
      Alert.alert('Error', 'Ingresa valores numéricos válidos.');
      return;
    }

    if (descuentoNum < 0 || descuentoNum > 100) {
      Alert.alert('Error', 'El porcentaje de descuento debe estar entre 0 y 100.');
      return;
    }

    const ahorro = precioNum * (descuentoNum / 100);
    const precioFinal = precioNum - ahorro;

    setResultado({
      nombreProducto: nombre.trim(),
      precioOriginal: precioNum,
      porcentaje: descuentoNum,
      ahorro,
      precioFinal,
    });
  };

  const nuevoCalculo = () => {
    setNombre('');
    setPrecio('');
    setDescuento('');
    setResultado(null);
  };

  const esSuperOferta = resultado && resultado.porcentaje >= 40;
  const esDescuentoAlto = resultado && resultado.porcentaje >= 50;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado alumno */}
        <View style={styles.headerCard}>
          <Text style={styles.headerIcon}>🎓</Text>
          <Text style={styles.headerNombre}>Edgar Antonio Venegas Bazan</Text>
          <Text style={styles.headerGrupo}>6° Programación</Text>
        </View>

        {/* Título */}
        <Text style={styles.titulo}>Calculadora de Descuentos</Text>
        <Text style={styles.subtitulo}>
          Ingresa los datos del producto para calcular su precio final
        </Text>

        {/* Formulario */}
        <View style={styles.formCard}>
          <Text style={styles.label}>📦 Nombre del Producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Laptop Gamer"
            placeholderTextColor="#888"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>💲 Precio Original</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 15000"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={precio}
            onChangeText={setPrecio}
          />

          <Text style={styles.label}>🏷️ Porcentaje de Descuento (0 - 100)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 25"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={descuento}
            onChangeText={setDescuento}
          />

          <TouchableOpacity style={styles.botonCalcular} onPress={calcular}>
            <Text style={styles.botonTexto}>🧮 Calcular</Text>
          </TouchableOpacity>
        </View>

        {/* Resultado */}
        {resultado && resultado.precioFinal > 0 && (
          <View style={styles.resultadoCard}>
            <Text style={styles.resultadoTitulo}>📋 Resumen de Compra</Text>

            <View style={styles.filaResultado}>
              <Text style={styles.resultadoLabel}>Producto:</Text>
              <Text style={styles.resultadoValor}>{resultado.nombreProducto}</Text>
            </View>

            <View style={styles.filaResultado}>
              <Text style={styles.resultadoLabel}>Precio Original:</Text>
              <Text style={styles.resultadoValor}>
                ${resultado.precioOriginal.toFixed(2)}
              </Text>
            </View>

            <View style={styles.filaResultado}>
              <Text style={styles.resultadoLabel}>Descuento:</Text>
              <Text style={styles.resultadoValor}>{resultado.porcentaje}%</Text>
            </View>

            <View style={styles.filaResultado}>
              <Text style={styles.resultadoLabel}>Ahorro:</Text>
              <Text style={[styles.resultadoValor, styles.ahorroTexto]}>
                -${resultado.ahorro.toFixed(2)}
              </Text>
            </View>

            <View style={styles.separador} />

            <View style={styles.filaPrecioFinal}>
              <Text style={styles.precioFinalLabel}>Precio Final:</Text>
              <Text
                style={[
                  styles.precioFinalValor,
                  esDescuentoAlto && styles.precioFinalRojo,
                ]}
              >
                ${resultado.precioFinal.toFixed(2)}
              </Text>
            </View>

            {/* Super Oferta cuando descuento >= 40% */}
            {esSuperOferta && (
              <View style={styles.superOfertaBanner}>
                <Text style={styles.superOfertaTexto}>
                  🔥 ¡ESTA ES UNA SUPER OFERTA! 🔥
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Botón Nuevo Cálculo */}
        {resultado && (
          <TouchableOpacity style={styles.botonNuevo} onPress={nuevoCalculo}>
            <Text style={styles.botonNuevoTexto}>🔄 Nuevo Cálculo</Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  scroll: {
    padding: 20,
    paddingTop: 50,
  },

  /* ── Encabezado alumno ── */
  headerCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  headerIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  headerNombre: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    textAlign: 'center',
  },
  headerGrupo: {
    color: '#7c7cf0',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },

  /* ── Título ── */
  titulo: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitulo: {
    color: '#9999bb',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },

  /* ── Formulario ── */
  formCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  label: {
    color: '#ccccee',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#12122a',
    borderRadius: 10,
    padding: 14,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3a3a5a',
  },
  botonCalcular: {
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  /* ── Resultado ── */
  resultadoCard: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#6c5ce7',
  },
  resultadoTitulo: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  filaResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultadoLabel: {
    color: '#9999bb',
    fontSize: 15,
  },
  resultadoValor: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  ahorroTexto: {
    color: '#00d2a0',
  },
  separador: {
    height: 1,
    backgroundColor: '#3a3a5a',
    marginVertical: 12,
  },
  filaPrecioFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  precioFinalLabel: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  precioFinalValor: {
    color: '#00d2a0',
    fontSize: 22,
    fontWeight: '800',
  },
  precioFinalRojo: {
    color: '#ff4757',
    fontWeight: '900',
  },

  /* ── Super Oferta ── */
  superOfertaBanner: {
    backgroundColor: '#ff475720',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ff4757',
  },
  superOfertaTexto: {
    color: '#ff4757',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },

  /* ── Botón Nuevo Cálculo ── */
  botonNuevo: {
    backgroundColor: '#2a2a4a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a5a',
  },
  botonNuevoTexto: {
    color: '#ccccee',
    fontSize: 16,
    fontWeight: '600',
  },
});
