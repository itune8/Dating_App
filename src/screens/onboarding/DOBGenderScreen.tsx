import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePicker from '@react-native-community/datetimepicker';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';

type DOBGenderScreenRouteProp = RouteProp<OnboardingStackParamList, 'DOBGender'>;
type DOBGenderScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'DOBGender'>;

const DOBGenderScreen: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [gender, setGender] = useState<'male' | 'female' | 'other' | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute<DOBGenderScreenRouteProp>();
  const navigation = useNavigation<DOBGenderScreenNavigationProp>();
  const { name } = route.params;

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const handleContinue = () => {
    if (!gender) {
      Alert.alert('Error', 'Please select your gender');
      return;
    }

    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    if (age < 18) {
      Alert.alert('Error', 'You must be at least 18 years old');
      return;
    }

    navigation.navigate('Location', {
      name,
      dateOfBirth: dateOfBirth.toISOString().split('T')[0],
      gender,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>
          Date of Birth: {dateOfBirth.toDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.subtitle}>Gender</Text>
      <View style={styles.genderContainer}>
        {(['male', 'female', 'other'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.genderButton, gender === option && styles.genderButtonSelected]}
            onPress={() => setGender(option)}
          >
            <Text style={[styles.genderText, gender === option && styles.genderTextSelected]}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
  },
  dateText: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  genderButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  genderText: {
    fontSize: 16,
  },
  genderTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DOBGenderScreen;