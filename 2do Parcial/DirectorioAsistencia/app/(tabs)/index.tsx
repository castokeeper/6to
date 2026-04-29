import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import TarjetaUsuario from '@/components/TarjetaUsuario';

type Usuario = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
};

export default function DirectorioScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, []);

  const manejarBusqueda = (texto: string) => {
    const textoLimpio = texto.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    setBusqueda(textoLimpio);
  };

  const usuariosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return usuarios;
    return usuarios.filter((usuario) => usuario.name.toLowerCase().includes(termino));
  }, [usuarios, busqueda]);

  if (cargando) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Directorio</Text>

      <TextInput
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={manejarBusqueda}
        style={styles.input}
      />

      {usuariosFiltrados.length === 0 ? (
        <Text style={styles.noResultados}>No se encontraron coincidencias</Text>
      ) : (
        <FlatList
          data={usuariosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TarjetaUsuario
              usuario={item}
              onPress={() =>
                router.push({
                  pathname: '/perfil',
                  params: { usuario: JSON.stringify(item) },
                })
              }
            />
          )}
          contentContainerStyle={styles.lista}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 56,
    backgroundColor: '#fff',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  lista: {
    paddingBottom: 24,
  },
  noResultados: {
    marginTop: 8,
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 16,
  },
});
