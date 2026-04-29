import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PantallaPrincipal() {
  const navigation = useNavigation();
  const route = useRoute();
  const [nombreUsuario, setNombreUsuario] = useState('Juan');
  const { nombreActual } = (route.params as { nombreActual?: string }) ?? {};

  useEffect(() => {
    if (typeof nombreActual === 'string' && nombreActual.length > 0) {
      setNombreUsuario(nombreActual);
    }
  }, [nombreActual]);

  const abrirEditorPerfil = () => {
    navigation.navigate('modal' as never, {
      nombreActual: nombreUsuario,
    } as never);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">PantallaPrincipal</ThemedText>
      <ThemedText type="subtitle">Usuario: {nombreUsuario}</ThemedText>

      <Pressable onPress={abrirEditorPerfil} style={styles.button}>
        <ThemedText type="defaultSemiBold">Editar perfil</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
