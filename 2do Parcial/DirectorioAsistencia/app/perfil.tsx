import { useLocalSearchParams } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Usuario = {
  name: string;
  email: string;
  phone: string;
  company: { name: string };
};

export default function PerfilScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = useLocalSearchParams<{ usuario?: string }>();
  const routeParams = route.params as { usuario?: string } | undefined;
  const usuarioSerializado = routeParams?.usuario ?? params.usuario;
  const usuario: Usuario | null = usuarioSerializado ? JSON.parse(usuarioSerializado) : null;

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No se pudo cargar la informacion del usuario.</Text>
        <Pressable style={styles.boton} onPress={() => navigation.goBack()}>
          <Text style={styles.botonTexto}>Volver a la lista</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{usuario.name}</Text>

      <View style={styles.bloque}>
        <Text style={styles.etiqueta}>Email</Text>
        <Text style={styles.valor}>{usuario.email}</Text>
      </View>

      <View style={styles.bloque}>
        <Text style={styles.etiqueta}>Telefono</Text>
        <Text style={styles.valor}>{usuario.phone}</Text>
      </View>

      <View style={styles.bloque}>
        <Text style={styles.etiqueta}>Empresa</Text>
        <Text style={styles.valor}>{usuario.company.name}</Text>
      </View>

      <Pressable style={styles.boton} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Volver a la lista</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  nombre: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 20,
    color: '#111827',
  },
  bloque: {
    marginBottom: 14,
  },
  etiqueta: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  valor: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '500',
  },
  boton: {
    marginTop: 24,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  error: {
    fontSize: 16,
    color: '#b91c1c',
    marginBottom: 12,
  },
});
