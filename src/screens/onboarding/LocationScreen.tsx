import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/OnboardingNavigator';

type LocationScreenRouteProp = RouteProp<OnboardingStackParamList, 'Location'>;
type LocationScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Location'>;

const LocationScreen: React.FC = () => {
  const [location, setLocation] = useState('');
  const route = useRoute<LocationScreenRouteProp>();
  const navigation = useNavigation<LocationScreenNavigationProp>();
  const { name, dateOfBirth, gender } = route.params;

  const handleContinue = () => {
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter your location');
      return;
    }
    navigation.navigate('LookingFor', {
      name,
      dateOfBirth,
      gender,
      location: location.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where are you located?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your city"
        value={location}
        onChangeText={setLocation}
        autoCapitalize="words"
      />
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
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

export default LocationScreen;