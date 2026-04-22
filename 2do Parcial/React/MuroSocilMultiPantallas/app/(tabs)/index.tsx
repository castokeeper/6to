import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import Reporte from '@/components/Reporte';
import { useResponsive } from '@/hooks/use-responsive';

type Prioridad = 'Alta' | 'Media' | 'Baja';

interface ReporteItem {
  id: string;
  titulo: string;
  colonia: string;
  prioridad: Prioridad;
}

const reportes: ReporteItem[] = [
  { id: '1', titulo: 'Bache en Av. Principal', colonia: 'Col. Centro', prioridad: 'Alta' },
  { id: '2', titulo: 'Alumbrado público apagado', colonia: 'Col. Las Flores', prioridad: 'Media' },
  { id: '3', titulo: 'Basura acumulada', colonia: 'Col. Jardines', prioridad: 'Alta' },
  { id: '4', titulo: 'Fuga de agua', colonia: 'Col. Norte', prioridad: 'Alta' },
  { id: '5', titulo: 'Grafiti en parque', colonia: 'Col. Sur', prioridad: 'Baja' },
];

export default function Inicio() {
  const { fs, sp, isTablet, contentWidth } = useResponsive();

  return (
    <View style={styles.container}>
      <Text style={[styles.encabezado, { fontSize: fs.xl, marginBottom: sp.md }]}>
        🏘️ Muro de Reportes Ciudadanos
      </Text>

      <FlatList
        data={reportes}
        keyExtractor={(item) => item.id}
        // En tablet se muestran 2 columnas
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'phone'}
        columnWrapperStyle={isTablet ? styles.columnas : undefined}
        renderItem={({ item }) => (
          <View style={isTablet ? { flex: 1, marginHorizontal: sp.xs / 2 } : undefined}>
            <Reporte
              titulo={item.titulo}
              colonia={item.colonia}
              prioridad={item.prioridad}
            />
          </View>
        )}
        contentContainerStyle={[
          styles.lista,
          { paddingBottom: 100, maxWidth: contentWidth, alignSelf: 'center', width: '100%' },
        ]}
      />

      <TouchableOpacity
        style={[
          styles.boton,
          {
            paddingVertical: sp.sm,
            paddingHorizontal: isTablet ? sp.xl * 2 : sp.xl,
            bottom: sp.lg,
          },
        ]}
        onPress={() => router.push('/detalleReporte')}
      >
        <Text style={[styles.botonTexto, { fontSize: fs.md }]}>+ Nuevo Reporte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  encabezado: {
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
  },
  lista: {
    flexGrow: 1,
  },
  columnas: {
    gap: 12,
  },
  boton: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#3F51B5',
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#3F51B5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
