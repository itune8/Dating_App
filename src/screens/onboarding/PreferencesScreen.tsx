import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { OnboardingStackParamList } from '../../types/navigation';
import { useAppState } from '../../context/AppStateContext';

type NavProp = StackNavigationProp<OnboardingStackParamList, 'Preferences'>;
type RouteProps = RouteProp<OnboardingStackParamList, 'Preferences'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const PreferencesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { completeOnboarding } = useAppState();
  const { phone, name, city, dob } = route.params;
  const [lookingFor, setLookingFor] = useState('Relationship');
  const [gender, setGender] = useState<'man' | 'woman' | 'everyone' | null>(
    null,
  );

  const canFinish = !!gender;

  const finish = async () => {
    if (!gender) return;
    await completeOnboarding({
      phone,
      name,
      city,
      dob,
      gender,
      lookingFor,
    });
    // AppNavigator will switch to main tabs when onboarded is true
  };

  const renderPill = (
    label: string,
    value: 'man' | 'woman' | 'everyone',
  ) => (
    <TouchableOpacity
      key={value}
      style={[styles.pill, gender === value && styles.pillActive]}
      onPress={() => setGender(value)}
    >
      <Text
        style={[styles.pillText, gender === value && styles.pillTextActive]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Who do you want to meet?</Text>
        <Text style={styles.subtitle}>You can change this anytime in settings.</Text>

        <View style={styles.pillRow}>
          {renderPill('Women', 'woman')}
          {renderPill('Men', 'man')}
          {renderPill('Everyone', 'everyone')}
        </View>

        <Text style={[styles.subtitle, { marginTop: 24 }]}>Looking for</Text>
        <View style={styles.pillRow}>
          {['Relationship', 'Something casual', 'Not sure yet'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.pill,
                lookingFor === option && styles.pillActive,
              ]}
              onPress={() => setLookingFor(option)}
            >
              <Text
                style={[
                  styles.pillText,
                  lookingFor === option && styles.pillTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, !canFinish && styles.primaryButtonDisabled]}
        disabled={!canFinish}
        onPress={finish}
      >
        <Text style={styles.primaryButtonText}>Finish</Text>
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
    marginBottom: 12,
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.cardAlt,
    marginRight: 8,
    marginBottom: 10,
  },
  pillActive: {
    backgroundColor: colors.primary,
  },
  pillText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
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

export default PreferencesScreen;
