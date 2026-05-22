import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import COLORS from './src/styles/colors';
import useAlumnos from './src/hooks/useAlumnos';
import Header from './src/components/Header';
import AlumnoRow from './src/components/AlumnoRow';
import EmptyState from './src/components/EmptyState';
import Creditos from './src/components/Creditos';

export default function App() {
  const { alumnos, presentes, ausentes, agregarAlumno, toggleEstado, eliminar } =
    useAlumnos();

  const renderItem = ({ item }) => (
    <AlumnoRow alumno={item} onToggle={toggleEstado} onEliminar={eliminar} />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Header presentes={presentes} ausentes={ausentes} total={alumnos.length} />

        <TouchableOpacity style={styles.addBtn} onPress={agregarAlumno}>
          <Text style={styles.addBtnText}>+ Registrar alumno</Text>
        </TouchableOpacity>

        {alumnos.length === 0 ? (
          <EmptyState />
        ) : (
          <FlatList
            data={alumnos}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}

        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  addBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addBtnText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 24,
  },
});
