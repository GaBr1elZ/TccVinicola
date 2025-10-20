import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

import Animated from 'react-native-reanimated';

const AnimatedIconSymbol = Animated.createAnimatedComponent(IconSymbol);

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7B1E3A',
        tabBarInactiveTintColor: '#6B7280',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopWidth: 0,
            borderRadius: 25,
            marginHorizontal: 10,
            marginBottom: 34,
            height: 80,
            paddingTop: 10,
            paddingBottom: 10,
          },
          default: {
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderTopWidth: 0,
            borderRadius: 25,
            marginHorizontal: 10,
            marginBottom: 20,
            height: 70,
            paddingTop: 8,
            paddingBottom: 8,
            elevation: 6,
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 6,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 2,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIconSymbol
              size={focused ? 30 : 28}
              name="house.fill"
              color={focused ? '#7B1E3A' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIconSymbol
              size={focused ? 30 : 28}
              name="wineglass"
              color={focused ? '#7B1E3A' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'QR Code',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIconSymbol
              size={focused ? 30 : 28}
              name="qrcode"
              color={focused ? '#7B1E3A' : color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: 'Reservas',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIconSymbol
              size={focused ? 30 : 28}
              name="calendar"
              color={focused ? '#7B1E3A' : color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
