import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../contexts/AuthContext';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';

type LookingForScreenRouteProp = RouteProp<OnboardingStackParamList, 'LookingFor'>;
type LookingForScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'LookingFor'>;

const LookingForScreen: React.FC = () => {
  const [lookingFor, setLookingFor] = useState<'male' | 'female' | 'both' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute<LookingForScreenRouteProp>();
  const navigation = useNavigation<LookingForScreenNavigationProp>();
  const { completeOnboarding } = useAuth();
  const { name, dateOfBirth, gender, location } = route.params;

  const handleComplete = async () => {
    if (!lookingFor) {
      Alert.alert('Error', 'Please select who you are looking for');
      return;
    }

    setIsLoading(true);
    try {
      await completeOnboarding({
        name,
        dateOfBirth,
        gender,
        location,
        lookingFor,
      });
      // Navigation will be handled by AuthContext listener
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to complete onboarding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you looking for?</Text>
      <View style={styles.optionsContainer}>
        {(['male', 'female', 'both'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, lookingFor === option && styles.optionButtonSelected]}
            onPress={() => setLookingFor(option)}
          >
            <Text style={[styles.optionText, lookingFor === option && styles.optionTextSelected]}>
              {option === 'both' ? 'Everyone' : option.charAt(0).toUpperCase() + option.slice(1) + 's'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleComplete}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Complete Setup</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 18,
  },
  optionTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LookingForScreen;