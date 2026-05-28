import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [sm1_calif, setSm1_calif] = useState('');
  const [sm2_calif, setSm2_calif] = useState('');
  const [apoyo_calif, setApoyo_calif] = useState('');
  const [ritmo_calif, setRitmo_calif] = useState('');
  const [eval_calif, setEval_calif] = useState('');

  const [gusto, setGusto] = useState('');
  const [noGusto, setNoGusto] = useState('');
  const [materiales, setMateriales] = useState('');
  const [laboratorio, setLaboratorio] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [actitud, setActitud] = useState('');
  const [comentarios, setComentarios] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const guardado = await AsyncStorage.getItem('@evaluacion_final_profe');
        if (guardado !== null) {
          const d = JSON.parse(guardado);
          setSm1_calif(d.sm1_calif || ''); setSm2_calif(d.sm2_calif || '');
          setApoyo_calif(d.apoyo_calif || ''); setRitmo_calif(d.ritmo_calif || '');
          setEval_calif(d.eval_calif || ''); setGusto(d.gusto || '');
          setNoGusto(d.noGusto || ''); setMateriales(d.materiales || '');
          setLaboratorio(d.laboratorio || ''); setProyecto(d.proyecto || '');
          setActitud(d.actitud || ''); setComentarios(d.comentarios || '');
        }
      } catch (e) {
        console.log("Error al recuperar los datos");
      }
    };
    cargarDatos();
  }, []);

  // Guardar datos localmente de forma automática en cada cambio
  const guardarProgreso = async (campo, valor) => {
    try {
      const actual = {
        sm1_calif, sm2_calif, apoyo_calif, ritmo_calif, eval_calif,
        gusto, noGusto, materiales, laboratorio, proyecto, actitud, comentarios, [campo]: valor
      };
      await AsyncStorage.setItem('@evaluacion_final_profe', JSON.stringify(actual));
    } catch (e) {
      console.log("Error al resguardar progreso");
    }
  };

  // Validación: Solo activa el botón si los campos con (*) tienen texto
  const formularioValido =
    sm1_calif.trim() !== '' && sm2_calif.trim() !== '' &&
    apoyo_calif.trim() !== '' && ritmo_calif.trim() !== '' && eval_calif.trim() !== '' &&
    gusto.trim() !== '' && noGusto.trim() !== '' && proyecto.trim() !== '';

  const finalizarEncuesta = () => {
    Alert.alert(
      "¡Formulario Completado!",
      "Toma 3 capturas de pantalla haciendo scroll en tu aplicación donde se lean todas tus respuestas y súbelas a Classroom.",
      [{ text: "Entendido" }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Evaluación Docente Anónima</Text>
      <Text style={styles.subtitulo}>Retroalimentación de Cierre - Módulo de Desarrollo Móvil</Text>

      {/* BLOQUE 1: MÉTRICAS CUANTITATIVAS */}
      <View style={styles.tarjeta}>
        <Text style={styles.seccionHeader}>1. Indicadores de Desempeño (Escala del 1 al 5)</Text>

        <Text style={styles.label}>1.1 Submódulo 1 (Figma): ¿Las clases te dieron bases sólidas para estructurar interfaces (UI/UX)? *</Text>
        <TextInput
          style={styles.inputNum} placeholder="Número 1 al 5" keyboardType="numeric"
          value={sm1_calif} onChangeText={(v) => { setSm1_calif(v); guardarProgreso('sm1_calif', v); }}
        />

        <Text style={styles.label}>1.2 Submódulo 2 (React Native): ¿Las clases de código y lógica (estados, SQLite) cumplieron tus expectativas? *</Text>
        <TextInput
          style={styles.inputNum} placeholder="Número 1 al 5" keyboardType="numeric"
          value={sm2_calif} onChangeText={(v) => { setSm2_calif(v); guardarProgreso('sm2_calif', v); }}
        />

        <Text style={styles.label}>1.3 Soporte en Errores: ¿Cómo calificas la disposición del profesor para ayudarte a corregir fallas en tu código? *</Text>
        <TextInput
          style={styles.inputNum} placeholder="Número 1 al 5" keyboardType="numeric"
          value={apoyo_calif} onChangeText={(v) => { setApoyo_calif(v); guardarProgreso('apoyo_calif', v); }}
        />

        <Text style={styles.label}>1.4 Control del Ritmo: ¿Consideras que la velocidad con la que se explicaron los temas fue adecuada? *</Text>
        <TextInput
          style={styles.inputNum} placeholder="Número 1 al 5" keyboardType="numeric"
          value={ritmo_calif} onChangeText={(v) => { setRitmo_calif(v); guardarProgreso('ritmo_calif', v); }}
        />

        <Text style={styles.label}>1.5 Criterios de Evaluación: ¿Los requerimientos y las rúbricas de los proyectos parciales fueron claros y justos? *</Text>
        <TextInput
          style={styles.inputNum} placeholder="Número 1 al 5" keyboardType="numeric"
          value={eval_calif} onChangeText={(v) => { setEval_calif(v); guardarProgreso('eval_calif', v); }}
        />
      </View>

      {/* BLOQUE 2: PREGUNTAS ABIERTAS */}
      <View style={styles.tarjeta}>
        <Text style={styles.seccionHeader}>2. Experiencia Práctica y Aprendizaje</Text>

        <Text style={styles.label}>2.1 ¿Qué fue lo que MÁS TE GUSTÓ de las clases, explicaciones o dinámicas del profesor? *</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="Explica detalladamente qué funcionó bien para ti..."
          value={gusto} onChangeText={(v) => { setGusto(v); guardarProgreso('gusto', v); }}
        />

        <Text style={styles.label}>2.2 ¿Qué fue lo que NO TE GUSTÓ, te causó confusión o cambiarías drásticamente de la dinámica de clase? *</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="Sé honesto: dinámicas pesadas, explicaciones enredadas, etc..."
          value={noGusto} onChangeText={(v) => { setNoGusto(v); guardarProgreso('noGusto', v); }}
        />

        <Text style={styles.label}>2.3 Sobre los temas explicados en el pizarrón: ¿Consideras que los ejemplos de código fueron claros y fáciles de replicar? [Opcional]</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="Comentarios sobre el código de ejemplo visto en clase..."
          value={materiales} onChangeText={(v) => { setMateriales(v); guardarProgreso('materiales', v); }}
        />

        <Text style={styles.label}>2.4 Entorno Técnico: ¿Qué dificultades externas (fallas en PC, internet, emuladores o Expo) frenaron tu ritmo de desarrollo? [Opcional]</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="Describe los problemas técnicos del laboratorio si los hubo..."
          value={laboratorio} onChangeText={(v) => { setLaboratorio(v); guardarProgreso('laboratorio', v); }}
        />

        <Text style={styles.label}>2.5 Impacto: ¿Qué tanto sientes que lo aprendido en esta materia te servirá para tus futuros proyectos o vida profesional? *</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="¿Consideras valiosos estos conocimientos de desarrollo móvil?"
          value={proyecto} onChangeText={(v) => { setProyecto(v); guardarProgreso('proyecto', v); }}
        />

        <Text style={styles.label}>2.6 Actitud Docente: ¿El trato del profesor hacia el grupo fue respetuoso y fomentó un ambiente seguro para aprender? [Opcional]</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="Comentarios sobre el ambiente de respeto en el aula..."
          value={actitud} onChangeText={(v) => { setActitud(v); guardarProgreso('actitud', v); }}
        />

        <Text style={styles.label}>2.7 Comentarios Generales y Sugerencias Libres: Escribe cualquier otra opinión, queja, felicitación o sugerencia que quieras dejarle al profesor de forma anónima. [Opcional]</Text>
        <TextInput
          style={[styles.input, styles.textArea]} multiline placeholder="Espacio libre para expresarte..."
          value={comentarios} onChangeText={(v) => { setComentarios(v); guardarProgreso('comentarios', v); }}
        />
      </View>

      <Button
        title={formularioValido ? "Guardar y Generar Evidencia" : "Responde los campos obligatorios (*)"}
        onPress={finalizarEncuesta}
        disabled={!formularioValido}
        color="#16a085"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f7' },
  content: { padding: 12, paddingBottom: 40 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', textAlign: 'center', marginTop: 5 },
  subtitulo: { fontSize: 12, color: '#7f8c8d', textAlign: 'center', marginBottom: 12 },
  tarjeta: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, elevation: 2 },
  seccionHeader: { fontSize: 13, fontWeight: 'bold', color: '#2980b9', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 3 },
  label: { fontSize: 11, color: '#34495e', marginBottom: 4, fontWeight: '600', lineHeight: 15 },
  input: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', padding: 6, borderRadius: 5, marginBottom: 10, fontSize: 12 },
  inputNum: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', padding: 5, borderRadius: 5, marginBottom: 12, fontSize: 12, width: 120, textAlign: 'center' },
  textArea: { height: 60, textAlignVertical: 'top' }

});
