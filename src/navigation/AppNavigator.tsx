import React from 'react';
import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import OnboardingNavigator from './OnboardingNavigator';
import { useAppState } from '../context/AppStateContext';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const appTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF1F5',
    card: '#FFF1F5',
    text: '#111827',
    border: '#F9A8D4',
    primary: '#EC4899',
  },
};

const AppNavigator: React.FC = () => {
  const { onboarded, loading } = useAppState();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer theme={appTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!onboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
