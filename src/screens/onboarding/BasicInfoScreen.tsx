import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors } from '../../theme/colors';
import { OnboardingStackParamList } from '../../types/navigation';

type NavProp = StackNavigationProp<OnboardingStackParamList, 'BasicInfo'>;
type RouteProps = RouteProp<OnboardingStackParamList, 'BasicInfo'>;

interface Props {
  navigation: NavProp;
  route: RouteProps;
}

const BasicInfoScreen: React.FC<Props> = ({ navigation, route }) => {
  const { phone } = route.params;
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const canContinue = name.trim().length > 1 && city.trim().length > 1 && !!dob;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tell us about you</Text>
        <Text style={styles.subtitle}>We’ll use this to build your profile.</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={dob ? styles.inputText : styles.placeholderText}>
            {dob ? dob.toDateString() : 'Date of birth'}
          </Text>
        </TouchableOpacity>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="City"
          style={styles.input}
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          mode="date"
          display="spinner"
          onChange={(_, date) => {
            setShowPicker(false);
            if (date) setDob(date);
          }}
        />
      )}

      <TouchableOpacity
        style={[styles.primaryButton, !canContinue && styles.primaryButtonDisabled]}
        disabled={!canContinue}
        onPress={() =>
          navigation.navigate('Preferences', {
            phone,
            name,
            city,
            dob: dob ? dob.toISOString() : null,
          })
        }
      >
        <Text style={styles.primaryButtonText}>Next</Text>
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
  },
  inputText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  placeholderText: {
    fontSize: 16,
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

export default BasicInfoScreen;
