import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useResponsive } from '@/hooks/use-responsive';

type Prioridad = 'Alta' | 'Media' | 'Baja';

const PRIORIDADES: Prioridad[] = ['Alta', 'Media', 'Baja'];

const COLORES_PRIORIDAD: Record<Prioridad, { activo: string }> = {
  Alta: { activo: '#D32F2F' },
  Media: { activo: '#F57F17' },
  Baja: { activo: '#2E7D32' },
};

export default function DetalleReporte() {
  const { fs, sp, contentWidth, textareaHeight } = useResponsive();

  const [problema, setProblema] = useState('');
  const [colonia, setColonia] = useState('');
  const [prioridad, setPrioridad] = useState<Prioridad>('Media');

  const handleEnviar = () => {
    if (!problema.trim() || !colonia.trim()) {
      alert('Por favor completa todos los campos antes de enviar.');
      return;
    }
    router.push({
      pathname: '/confirmacion',
      params: { problema, colonia, prioridad },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.content,
          {
            padding: sp.lg,
            maxWidth: contentWidth,
            alignSelf: 'center',
            width: '100%',
          },
        ]}
      >
        <Text style={[styles.subtitulo, { fontSize: fs.sm, marginBottom: sp.lg }]}>
          Describe el problema que deseas reportar a las autoridades.
        </Text>

        <Text style={[styles.label, { fontSize: fs.sm, marginBottom: sp.xs }]}>
          📝 Descripción del problema
        </Text>
        <TextInput
          style={[
            styles.input,
            styles.inputMultiline,
            {
              fontSize: fs.md,
              padding: sp.sm,
              marginBottom: sp.md,
              height: textareaHeight,
            },
          ]}
          placeholder="Ej: Hay un bache enorme en la esquina de..."
          placeholderTextColor="#9E9E9E"
          multiline
          numberOfLines={4}
          value={problema}
          onChangeText={setProblema}
        />

        <Text style={[styles.label, { fontSize: fs.sm, marginBottom: sp.xs }]}>
          📍 Colonia
        </Text>
        <TextInput
          style={[styles.input, { fontSize: fs.md, padding: sp.sm, marginBottom: sp.md }]}
          placeholder="Ej: Col. Centro"
          placeholderTextColor="#9E9E9E"
          value={colonia}
          onChangeText={setColonia}
        />

        <Text style={[styles.label, { fontSize: fs.sm, marginBottom: sp.xs }]}>
          ⚠️ Prioridad
        </Text>
        <View style={[styles.filaPrioridad, { gap: sp.xs, marginBottom: sp.xl }]}>
          {PRIORIDADES.map((p) => {
            const seleccionado = prioridad === p;
            return (
              <TouchableOpacity
                key={p}
                style={[
                  styles.chipPrioridad,
                  { paddingVertical: sp.xs },
                  seleccionado && {
                    backgroundColor: COLORES_PRIORIDAD[p].activo,
                    borderColor: COLORES_PRIORIDAD[p].activo,
                  },
                ]}
                onPress={() => setPrioridad(p)}
              >
                <Text
                  style={[
                    styles.chipTexto,
                    { fontSize: fs.md },
                    seleccionado && { color: '#FFFFFF' },
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.boton, { paddingVertical: sp.md }]}
          onPress={handleEnviar}
        >
          <Text style={[styles.botonTexto, { fontSize: fs.md }]}>📤 Enviar Reporte</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  content: {},
  subtitulo: {
    color: '#607D8B',
    lineHeight: 22,
  },
  label: {
    fontWeight: '700',
    color: '#1A237E',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    color: '#212121',
    borderWidth: 1,
    borderColor: '#C5CAE9',
    elevation: 2,
  },
  inputMultiline: {
    textAlignVertical: 'top',
  },
  filaPrioridad: {
    flexDirection: 'row',
  },
  chipPrioridad: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#C5CAE9',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  chipTexto: {
    fontWeight: '700',
    color: '#455A64',
  },
  boton: {
    backgroundColor: '#3F51B5',
    borderRadius: 30,
    alignItems: 'center',
    elevation: 5,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
