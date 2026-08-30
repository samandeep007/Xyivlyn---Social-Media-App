import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { colors, layout } from '@/theme/tokens';

export default function AppTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#273047',
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.divider,
          borderTopWidth: 1,
          height: layout.tabBarHeight,
          paddingTop: 9,
          paddingBottom: 10,
          shadowColor: '#111827',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.03,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarItemStyle: {
          paddingVertical: 2,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          lineHeight: 14,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'sparkles' : 'sparkles-outline'}
              size={focused ? 28 : Math.max(size, 25)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: 'Connections',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={Math.max(size, 25)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: colors.secondary,
            color: colors.white,
            fontSize: 10,
            fontWeight: '700',
            minWidth: 19,
            height: 19,
            lineHeight: 18,
            borderRadius: 10,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-outline" size={Math.max(size, 25)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: 'Journey',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={Math.max(size, 25)} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={Math.max(size, 25)} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
