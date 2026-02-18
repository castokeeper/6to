import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import MenuScreen from '../screens/MenuScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Navegador principal de la aplicación */
export default function AppNavigator(): React.JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                contentStyle: { backgroundColor: '#F5F0E8' },
            }}
        >
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        </Stack.Navigator>
    );
}
