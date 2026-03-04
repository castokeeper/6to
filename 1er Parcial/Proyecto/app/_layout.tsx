import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.primary,
          headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
          headerShadowVisible: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detail"
          options={{ title: 'Detalle de Carrera' }}
        />
        <Stack.Screen
          name="profile"
          options={{ title: 'Mi Perfil' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
