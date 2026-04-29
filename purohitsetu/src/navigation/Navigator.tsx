import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { colors } from '../constants/theme';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PurohitListScreen from '../screens/PurohitListScreen';
import PurohitDetailScreen from '../screens/PurohitDetailScreen';
import BajaListScreen from '../screens/BajaListScreen';
import MantraScreen from '../screens/MantraScreen';
import ContactUsScreen from '../screens/ContactUsScreen';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  PurohitDetail: { purohitId: string };
};

export type TabParamList = {
  Home: undefined;
  Purohit: undefined;
  Baja: undefined;
  Mantra: undefined;
  Contact: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function TabIcon({ label }: { label: string }) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Purohit: '🙏',
    Baja: '🥁',
    Mantra: '📖',
    Contact: '✉️',
  };
  return <Text style={{ fontSize: 20 }}>{icons[label] ?? '●'}</Text>;
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: string } }) => ({
        tabBarIcon: () => <TabIcon label={route.name} />,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.subtext,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Purohit" component={PurohitListScreen} />
      <Tab.Screen name="Baja" component={BajaListScreen} />
      <Tab.Screen name="Mantra" component={MantraScreen} />
      <Tab.Screen name="Contact" component={ContactUsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="PurohitDetail" component={PurohitDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
