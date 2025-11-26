import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { OnboardingStackParamList } from '../../types/navigation';

type NavProp = StackNavigationProp<OnboardingStackParamList, 'Phone'>;
type RouteProps = RouteProp<OnboardingStackParamList, 'Phone'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const PhoneScreen: React.FC<Props> = ({ navigation }) => {
  const [phone, setPhone] = useState('');

  const canContinue = phone.trim().length >= 8;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <Text style={styles.title}>What’s your number?</Text>
        <Text style={styles.subtitle}>
          We’ll send a one-time code to verify it. For now this is a demo (no
          real SMS).
        </Text>

        <View style={styles.inputRow}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            keyboardType="phone-pad"
            style={styles.input}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !canContinue && styles.primaryButtonDisabled]}
        disabled={!canContinue}
        onPress={() => navigation.navigate('Otp', { phone })}
      >
        <Text style={styles.primaryButtonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    justifyContent: 'space-between',
  },
  content: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
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

export default PhoneScreen;
