import { useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function PantallaPrincipal() {
  const [nombreUsuario, setNombreUsuario] = useState('Juan');
  const { nombreActual } = useLocalSearchParams<{ nombreActual?: string }>();

  useEffect(() => {
    if (typeof nombreActual === 'string' && nombreActual.length > 0) {
      setNombreUsuario(nombreActual);
    }
  }, [nombreActual]);

  const abrirEditorPerfil = () => {
    router.push({
      pathname: '/modal',
      nombreActual: nombreUsuario,
    });
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
