import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Prioridad = 'Alta' | 'Media' | 'Baja';

interface Reporte {
  id: string;
  problema: string;
  prioridad: Prioridad;
  distancia: string;
}

const reportes: Reporte[] = [
  {
    id: '1',
    problema: 'Bache peligroso en Av. Principal',
    prioridad: 'Alta',
    distancia: '0.3 km',
  },
  {
    id: '2',
    problema: 'Falta de alumbrado público',
    prioridad: 'Alta',
    distancia: '1.1 km',
  },
  {
    id: '3',
    problema: 'Acumulación de basura en parque',
    prioridad: 'Media',
    distancia: '0.8 km',
  },
  {
    id: '4',
    problema: 'Fuga de agua en calle 5',
    prioridad: 'Alta',
    distancia: '2.0 km',
  },
  {
    id: '5',
    problema: 'Grafiti en pared de escuela',
    prioridad: 'Baja',
    distancia: '1.5 km',
  },
  {
    id: '6',
    problema: 'Semáforo descompuesto',
    prioridad: 'Media',
    distancia: '0.6 km',
  },
  {
    id: '7',
    problema: 'Árbol caído sobre banqueta',
    prioridad: 'Alta',
    distancia: '3.2 km',
  },
];

function TarjetaReporte({ item }: { item: Reporte }) {
  const esPrioridadAlta = item.prioridad === 'Alta';

  return (
    <View style={styles.tarjeta}>
      <Text style={styles.idText}>Reporte #{item.id}</Text>
      <Text style={styles.problemaText}>{item.problema}</Text>
      <View style={styles.fila}>
        <View
          style={[
            styles.badgePrioridad,
            esPrioridadAlta
              ? styles.badgeAlta
              : item.prioridad === 'Media'
              ? styles.badgeMedia
              : styles.badgeBaja,
          ]}
        >
          <Text style={[styles.prioridadText, esPrioridadAlta && styles.prioridadAlta]}>
            ● {item.prioridad}
          </Text>
        </View>
        <Text style={styles.distanciaText}>📍 {item.distancia}</Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏙️ Muro de Conciencia Social</Text>
        <Text style={styles.headerSubtitle}>Reportes ciudadanos de tu comunidad</Text>
      </View>
      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TarjetaReporte item={item} />}
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
    gap: 12,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#3F51B5',
  },
  idText: {
    fontSize: 11,
    color: '#9E9E9E',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  problemaText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgePrioridad: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeAlta: {
    backgroundColor: '#FFEBEE',
  },
  badgeMedia: {
    backgroundColor: '#FFF8E1',
  },
  badgeBaja: {
    backgroundColor: '#E8F5E9',
  },
  prioridadText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4CAF50',
  },
  prioridadAlta: {
    color: '#D32F2F',
  },
  distanciaText: {
    fontSize: 13,
    color: '#607D8B',
    fontWeight: '500',
  },
});
