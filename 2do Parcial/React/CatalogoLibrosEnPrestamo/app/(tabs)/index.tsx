import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useResponsive } from '@/hooks/use-responsive';

interface Libro {
  id: string;
  titulo: string;
  autor: string;
  fechaDevolucion: string;
}

const libros: Libro[] = [
  {
    id: '1',
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    fechaDevolucion: '25 de abril',
  },
  {
    id: '2',
    titulo: 'El nombre de la rosa',
    autor: 'Umberto Eco',
    fechaDevolucion: '3 de mayo',
  },
  {
    id: '3',
    titulo: '1984',
    autor: 'George Orwell',
    fechaDevolucion: '10 de mayo',
  },
];

function TarjetaLibro({ libro }: { libro: Libro }) {
  const { fs, sp } = useResponsive();

  return (
    <View style={[styles.tarjeta, { padding: sp.md, marginBottom: sp.md }]}>
      {/* Ícono decorativo */}
      <View style={styles.iconoContainer}>
        <Text style={[styles.icono, { fontSize: fs.xxl }]}>📚</Text>
      </View>

      <View style={[styles.info, { marginBottom: sp.sm }]}>
        <Text style={[styles.titulo, { fontSize: fs.lg }]} numberOfLines={2}>
          {libro.titulo}
        </Text>
        <Text style={[styles.autor, { fontSize: fs.sm }]}>✍️ {libro.autor}</Text>
        <Text style={[styles.fecha, { fontSize: fs.xs }]}>
          📅 Devolver: {libro.fechaDevolucion}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.boton, { paddingVertical: sp.xs }]}
        onPress={() =>
          router.push({
            pathname: '/detalleLibro',
            params: {
              titulo: libro.titulo,
              autor: libro.autor,
              fechaDevolucion: libro.fechaDevolucion,
            },
          })
        }
      >
        <Text style={[styles.botonTexto, { fontSize: fs.sm }]}>Ver detalle →</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CatalogoLibros() {
  const { fs, sp, isTablet, contentWidth } = useResponsive();

  return (
    <View style={styles.container}>
      <Text style={[styles.encabezado, { fontSize: fs.xl, marginBottom: sp.xs }]}>
        📖 Catálogo de Préstamos
      </Text>
      <Text style={[styles.subencabezado, { fontSize: fs.xs, marginBottom: sp.lg }]}>
        Libros actualmente en préstamo
      </Text>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        // 2 columnas en tablet, 1 en móvil
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'phone'}
        columnWrapperStyle={isTablet ? { gap: sp.sm } : undefined}
        renderItem={({ item }) => (
          <View style={isTablet ? { flex: 1 } : undefined}>
            <TarjetaLibro libro={item} />
          </View>
        )}
        contentContainerStyle={[
          styles.lista,
          {
            maxWidth: contentWidth,
            alignSelf: 'center',
            width: '100%',
            paddingHorizontal: sp.md,
            paddingBottom: sp.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF2FB',
    paddingTop: 24,
  },
  encabezado: {
    fontWeight: 'bold',
    color: '#1B3A6B',
    textAlign: 'center',
  },
  subencabezado: {
    color: '#607D8B',
    textAlign: 'center',
  },
  lista: {
    flexGrow: 1,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#1B3A6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#3F6FD1',
  },
  iconoContainer: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  icono: {},
  info: {
    paddingRight: 40,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#1B3A6B',
    marginBottom: 6,
  },
  autor: {
    color: '#455A64',
    marginBottom: 4,
  },
  fecha: {
    color: '#E65100',
    fontWeight: '600',
  },
  boton: {
    backgroundColor: '#3F6FD1',
    borderRadius: 20,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
