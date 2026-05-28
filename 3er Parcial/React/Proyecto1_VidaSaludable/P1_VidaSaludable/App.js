import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { COLORS } from './styles/globalStyles';
import { HealthProvider } from './context/HealthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <HealthProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '800', fontSize: 18 },
            headerBackTitle: 'Atrás',
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            }),
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'VidaSana 🥦', headerLeft: null }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={({ route }) => ({ title: route.params?.item?.title || 'Detalle' })}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Mi Perfil' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </HealthProvider>
  );
}
