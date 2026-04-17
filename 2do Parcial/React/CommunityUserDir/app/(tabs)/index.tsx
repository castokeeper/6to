import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Empresa {
  name: string;
}

interface Usuario {
  id: number;
  name: string;
  email: string;
  company: Empresa;
}

export default function HomeScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data: Usuario[]) => {
        setUsuarios(data);
        setCargando(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🤝 Directorio de Voluntarios</Text>
        <Text style={styles.headerSubtitle}>Comunidad activa · {usuarios.length} miembros</Text>
      </View>

      {cargando ? (
        <View style={styles.centrado}>
          <ActivityIndicator size="large" color="#1A237E" />
          <Text style={styles.cargandoText}>Cargando voluntarios...</Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <TarjetaContacto usuario={item} />}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

function TarjetaContacto({ usuario }: { usuario: Usuario }) {
  return (
    <View style={styles.tarjeta}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarEmoji}>👤</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.nombre}>{usuario.name}</Text>
        <Text style={styles.correo}>✉️ {usuario.email}</Text>
        <View style={styles.empresaBadge}>
          <Text style={styles.empresaText}>🏢 {usuario.company.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#EEF2FF',
  },
  header: {
    backgroundColor: '#1A237E',
    paddingVertical: 22,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 8,
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
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  cargandoText: {
    color: '#1A237E',
    fontSize: 15,
    fontWeight: '500',
  },
  lista: {
    padding: 16,
    gap: 12,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#3F51B5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#3F51B5',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E8EAF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  correo: {
    fontSize: 13,
    color: '#546E7A',
  },
  empresaBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8EAF6',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginTop: 4,
  },
  empresaText: {
    fontSize: 12,
    color: '#3F51B5',
    fontWeight: '600',
  },
});
