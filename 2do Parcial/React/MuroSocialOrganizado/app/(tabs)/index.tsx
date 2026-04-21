import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Reporte from '@/components/Reporte';

type Prioridad = 'Alta' | 'Media' | 'Baja';

interface ReporteData {
  id: string;
  titulo: string;
  colonia: string;
  prioridad: Prioridad;
}

const reportes: ReporteData[] = [
  {
    id: '1',
    titulo: 'Bache peligroso en Av. Principal',
    colonia: 'Col. Centro',
    prioridad: 'Alta',
  },
  {
    id: '2',
    titulo: 'Falta de alumbrado público',
    colonia: 'Col. San Juan',
    prioridad: 'Alta',
  },
  {
    id: '3',
    titulo: 'Acumulación de basura en parque',
    colonia: 'Col. Las Flores',
    prioridad: 'Media',
  },
  {
    id: '4',
    titulo: 'Fuga de agua en calle 5',
    colonia: 'Col. Reforma',
    prioridad: 'Alta',
  },
  {
    id: '5',
    titulo: 'Grafiti en pared de escuela',
    colonia: 'Col. Obrera',
    prioridad: 'Baja',
  },
  {
    id: '6',
    titulo: 'Semáforo descompuesto',
    colonia: 'Col. Industrial',
    prioridad: 'Media',
  },
  {
    id: '7',
    titulo: 'Árbol caído sobre banqueta',
    colonia: 'Col. del Valle',
    prioridad: 'Alta',
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏙️ Muro de Reportes Ciudadanos</Text>
        <Text style={styles.headerSubtitle}>Reportes ciudadanos de tu comunidad</Text>
      </View>
      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Reporte
            titulo={item.titulo}
            colonia={item.colonia}
            prioridad={item.prioridad}
          />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    backgroundColor: '#1A237E',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#90CAF9',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  lista: {
    padding: 16,
  },
});
