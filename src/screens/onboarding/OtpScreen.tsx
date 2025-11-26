import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { OnboardingStackParamList } from '../../types/navigation';

type NavProp = StackNavigationProp<OnboardingStackParamList, 'Otp'>;
type RouteProps = RouteProp<OnboardingStackParamList, 'Otp'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const OtpScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phone } = route.params;
  const [code, setCode] = useState('');
  const [fakeCode] = useState('123456');

  useEffect(() => {
    setCode(fakeCode);
  }, [fakeCode]);

  const canContinue = code.length === 6;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Enter the code</Text>
        <Text style={styles.subtitle}>We sent a demo code to {phone}.</Text>

        <TextInput
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />
        <Text style={styles.helper}>Use 123456 for now. No real SMS.</Text>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !canContinue && styles.primaryButtonDisabled]}
        disabled={!canContinue}
        onPress={() => navigation.navigate('BasicInfo', { phone })}
      >
        <Text style={styles.primaryButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  input: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 20,
    letterSpacing: 10,
    textAlign: 'center',
    color: colors.textPrimary,
  },
  helper: {
    marginTop: 12,
    fontSize: 13,
    color: colors.textSecondary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonDisabled: {
    opacity: 0.4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OtpScreen;
