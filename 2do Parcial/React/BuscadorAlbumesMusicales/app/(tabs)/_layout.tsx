import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#10101e',
          borderTopColor: '#1e1e35',
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
          elevation: 0,
        },
        tabBarActiveTintColor: '#8b5cf6',
        tabBarInactiveTintColor: '#3a3a5a',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          letterSpacing: 0.5,
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Buscador',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 27 : 24}
              name="magnifyingglass"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Por Artista',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={focused ? 27 : 24}
              name="person.2.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
