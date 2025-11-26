import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../types/navigation';
import PhoneScreen from '../screens/onboarding/PhoneScreen';
import OtpScreen from '../screens/onboarding/OtpScreen';
import BasicInfoScreen from '../screens/onboarding/BasicInfoScreen';
import PreferencesScreen from '../screens/onboarding/PreferencesScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Phone"
    >
      <Stack.Screen name="Phone" component={PhoneScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="BasicInfo" component={BasicInfoScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;