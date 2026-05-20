import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';
import Home from './screens/Home';
import Details from './screens/Details';
import Profile from './screens/Profile';
import Recipes from './screens/Recipes';
import Routine from './screens/Routine';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Recipes" component={Recipes} />
          <Stack.Screen name="Routine" component={Routine} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
