import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

const headerStyle = {
  headerStyle: { backgroundColor: '#1A237E' },
  headerTintColor: '#FFFFFF',
  headerTitleStyle: { fontWeight: 'bold' as const },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen
          name="detalleReporte"
          options={{ title: '📋 Nuevo Reporte', ...headerStyle }}
        />
        <Stack.Screen
          name="confirmacion"
          options={{ title: '✅ Reporte Enviado', ...headerStyle }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
