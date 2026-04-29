import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type RouteParams = {
  nombreActual?: string;
};

export default function EditorPerfil() {
  const navigation = useNavigation();
  const route = useRoute();
  const { nombreActual = 'Juan' } = (route.params as RouteParams) ?? {};
  const [nombreNuevo, setNombreNuevo] = useState(nombreActual);

  useEffect(() => {
    setNombreNuevo(nombreActual);
  }, [nombreActual]);

  const manejarGuardado = () => {
    if (typeof (navigation as any).popTo === 'function') {
      (navigation as any).popTo('index', { nombreActual: nombreNuevo });
      return;
    }
    navigation.navigate('(tabs)' as never, {
      screen: 'index',
      params: { nombreActual: nombreNuevo },
    } as never);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">EditorPerfil</ThemedText>
      <TextInput
        value={nombreNuevo}
        onChangeText={setNombreNuevo}
        placeholder="Escribe un nuevo nombre"
        style={styles.input}
      />
      <Pressable onPress={manejarGuardado} style={styles.button}>
        <ThemedText type="defaultSemiBold">Guardar</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
