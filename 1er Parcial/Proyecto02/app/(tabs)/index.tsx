import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function HomeScreen(): React.JSX.Element {
  // Estados Fase 1
  const [accesoPermitido, setAccesoPermitido] = useState<boolean>(false);
  const [clave, setClave] = useState<string>('');

  // Estados Fase 2
  const [nombre, setNombre] = useState<string>('');
  const [especialidad, setEspecialidad] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [vigencia, setVigencia] = useState<number>(0);

  const validarClave = (): void => {
    if (clave === '2026') {
      setAccesoPermitido(true);
      setClave('');
    } else {
      Alert.alert('Acceso Denegado', 'Clave incorrecta');
    }
  };

  const incrementarVigencia = (): void => {
    setVigencia((prev: number) => prev + 1);
  };

  const decrementarVigencia = (): void => {
    setVigencia((prev: number) => (prev > 0 ? prev - 1 : 0));
  };

  const limpiarYSalir = (): void => {
    setNombre('');
    setEspecialidad('');
    setColor('');
    setVigencia(0);
    setClave('');
    setAccesoPermitido(false);
  };

  return (
    <View style={estilos.contenedorPrincipal}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Operador ternario: muestra Login o la App según el acceso */}
      {!accesoPermitido ? (
        <View style={estilos.contenedorLogin}>
          <View style={estilos.iconoCandado}>
            <Text style={estilos.iconoCandadoTexto}>🔒</Text>
          </View>

          <Text style={estilos.tituloLogin}>Acceso Restringido</Text>
          <Text style={estilos.subtituloLogin}>
            Ingrese la clave maestra para continuar
          </Text>

          <TextInput
            style={estilos.inputClave}
            placeholder="Ingrese Clave Maestra"
            placeholderTextColor="#7f8c8d"
            secureTextEntry={true}
            value={clave}
            onChangeText={(texto: string) => setClave(texto)}
            keyboardType="numeric"
            maxLength={10}
          />

          <TouchableOpacity
            style={estilos.botonValidar}
            onPress={validarClave}
            activeOpacity={0.8}
          >
            <Text style={estilos.textoBotonValidar}>Desbloquear</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={estilos.contenedorApp}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={estilos.scroll}
            contentContainerStyle={estilos.scrollContenido}
            keyboardShouldPersistTaps="handled"
          >
            {/* Fase 2: Panel de Configuración */}
            <View style={estilos.seccionPanel}>
              <Text style={estilos.tituloSeccion}>⚙️ Panel de Configuración</Text>

              <Text style={estilos.etiquetaCampo}>Nombre Completo</Text>
              <TextInput
                style={estilos.inputCampo}
                placeholder="Ej. Juan Pérez García"
                placeholderTextColor="#95a5a6"
                value={nombre}
                onChangeText={(texto: string) => setNombre(texto)}
              />

              <Text style={estilos.etiquetaCampo}>Especialidad / Carrera</Text>
              <TextInput
                style={estilos.inputCampo}
                placeholder="Ej. Ingeniería en Software"
                placeholderTextColor="#95a5a6"
                value={especialidad}
                onChangeText={(texto: string) => setEspecialidad(texto)}
              />

              <Text style={estilos.etiquetaCampo}>Color del Gafete</Text>
              <TextInput
                style={estilos.inputCampo}
                placeholder='Ej. "red", "#3498db", "lightblue"'
                placeholderTextColor="#95a5a6"
                value={color}
                onChangeText={(texto: string) => setColor(texto)}
              />

              <Text style={estilos.etiquetaCampo}>Vigencia (semestres)</Text>
              <View style={estilos.contenedorContador}>
                <TouchableOpacity
                  style={estilos.botonContador}
                  onPress={decrementarVigencia}
                  activeOpacity={0.7}
                >
                  <Text style={estilos.textoBotonContador}>−</Text>
                </TouchableOpacity>

                <View style={estilos.valorContadorCaja}>
                  <Text style={estilos.valorContador}>{vigencia}</Text>
                </View>

                <TouchableOpacity
                  style={[estilos.botonContador, estilos.botonContadorMas]}
                  onPress={incrementarVigencia}
                  activeOpacity={0.7}
                >
                  <Text style={estilos.textoBotonContador}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Fase 3: Visualización del Gafete */}
            <View style={estilos.seccionGafete}>
              <Text style={estilos.tituloSeccion}>🪪 Vista Previa del Gafete</Text>

              <View
                style={[
                  estilos.tarjetaGafete,
                  { backgroundColor: color || '#2c3e50' },
                ]}
              >
                {/* Ternario: si faltan datos muestra mensaje de espera, si no muestra el gafete */}
                {nombre.trim() === '' || especialidad.trim() === '' ? (
                  <Text style={estilos.textoEsperando}>
                    Esperando datos del usuario...
                  </Text>
                ) : (
                  <View style={estilos.contenidoGafete}>
                    <View style={estilos.gafeteEncabezado}>
                      <Text style={estilos.gafeteInstitucion}>
                        GAFETE INSTITUCIONAL
                      </Text>
                      <View style={estilos.gafeteLinea} />
                    </View>

                    <Text style={estilos.gafeteNombre}>{nombre}</Text>
                    <Text style={estilos.gafeteEspecialidad}>{especialidad}</Text>

                    {/* Operador AND (&&) para renderizado condicional */}
                    {vigencia > 0 && (
                      <View style={estilos.gafeteVigenciaContenedor}>
                        <Text style={estilos.gafeteVigenciaEtiqueta}>
                          Vigencia:
                        </Text>
                        <Text style={estilos.gafeteVigenciaValor}>
                          {vigencia} {vigencia === 1 ? 'semestre' : 'semestres'}
                        </Text>
                      </View>
                    )}

                    {vigencia === 0 && (
                      <Text style={estilos.gafeteSinVigencia}>
                        ⚠️ Sin vigencia asignada
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>

            <TouchableOpacity
              style={estilos.botonSalir}
              onPress={limpiarYSalir}
              activeOpacity={0.8}
            >
              <Text style={estilos.textoBotonSalir}>🔓 Limpiar y Salir</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  contenedorLogin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#0f0f23',
  },
  iconoCandado: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a1a3e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  iconoCandadoTexto: {
    fontSize: 42,
  },
  tituloLogin: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtituloLogin: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputClave: {
    width: '100%',
    height: 52,
    backgroundColor: '#1a1a3e',
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 4,
  },
  botonValidar: {
    width: '100%',
    height: 52,
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#e74c3c',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  textoBotonValidar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  contenedorApp: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  scroll: {
    flex: 1,
  },
  scrollContenido: {
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  seccionPanel: {
    backgroundColor: '#1a1a3e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2c3e50',
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  etiquetaCampo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#bdc3c7',
    marginBottom: 6,
    marginTop: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputCampo: {
    width: '100%',
    height: 48,
    backgroundColor: '#0f0f23',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#ecf0f1',
    borderWidth: 1,
    borderColor: '#2c3e50',
  },
  contenedorContador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  botonContador: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  botonContadorMas: {
    backgroundColor: '#27ae60',
  },
  textoBotonContador: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  valorContadorCaja: {
    width: 80,
    height: 50,
    backgroundColor: '#0f0f23',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#2c3e50',
  },
  valorContador: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  seccionGafete: {
    marginBottom: 20,
  },
  tarjetaGafete: {
    borderRadius: 16,
    padding: 24,
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  textoEsperando: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  contenidoGafete: {
    width: '100%',
    alignItems: 'center',
  },
  gafeteEncabezado: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  gafeteInstitucion: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 3,
    marginBottom: 8,
  },
  gafeteLinea: {
    width: '60%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  gafeteNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  gafeteEspecialidad: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: 16,
  },
  gafeteVigenciaContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 4,
  },
  gafeteVigenciaEtiqueta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginRight: 6,
  },
  gafeteVigenciaValor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  gafeteSinVigencia: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 8,
  },
  botonSalir: {
    width: '100%',
    height: 52,
    backgroundColor: '#c0392b',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    elevation: 4,
    shadowColor: '#c0392b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  textoBotonSalir: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
