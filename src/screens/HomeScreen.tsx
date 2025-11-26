import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
  location: string;
  interests: string[];
}

// Mock data for demonstration - using solid colors instead of external images
const mockProfiles: UserProfile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 25,
    bio: 'Coffee lover ☕ | Dog mom 🐕 | Love hiking in nature',
    image: '', // Will use a colored background
    location: 'San Francisco, CA',
    interests: ['Coffee', 'Dogs', 'Hiking', 'Photography'],
  },
  {
    id: '2',
    name: 'Mike',
    age: 28,
    bio: 'Software engineer 👨‍💻 | Guitar player 🎸 | Foodie',
    image: '', // Will use a colored background
    location: 'New York, NY',
    interests: ['Coding', 'Music', 'Food', 'Travel'],
  },
  {
    id: '3',
    name: 'Emma',
    age: 24,
    bio: 'Artist 🎨 | Yoga enthusiast 🧘‍♀️ | Beach lover',
    image: '', // Will use a colored background
    location: 'Los Angeles, CA',
    interests: ['Art', 'Yoga', 'Beach', 'Meditation'],
  },
];

const HomeScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateYAnim = useRef(new Animated.Value(20)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: 0,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentIndex, scaleAnim, translateYAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, [glowAnim]);

  const handleLike = () => {
    Alert.alert('Liked!', `You liked ${mockProfiles[currentIndex].name}!`);
    setCurrentIndex(prev => prev + 1);
  };

  const handlePass = () => {
    Alert.alert('Passed', `You passed on ${mockProfiles[currentIndex].name}`);
    setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= mockProfiles.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No more profiles!</Text>
          <Text style={styles.emptySubtitle}>Check back later for new matches</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.resetButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentProfile = mockProfiles[currentIndex];
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.2, 0.6],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { scale: scaleAnim },
                { translateY: translateYAnim },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.cardImage,
              { backgroundColor: colors[currentIndex % colors.length] }
            ]}
          >
            <Text style={styles.placeholderText}>
              {currentProfile.name.charAt(0)}
            </Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.name}>{currentProfile.name}, {currentProfile.age}</Text>
            <Text style={styles.location}>{currentProfile.location}</Text>
            <Text style={styles.bio}>{currentProfile.bio}</Text>
            <View style={styles.interestsContainer}>
              {currentProfile.interests.map((interest, idx) => (
                <View key={idx} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.cardGlow,
              {
                opacity: glowOpacity,
              },
            ]}
          />
        </Animated.View>
      </View>

      <View style={styles.buttonContainer}>
        <Animated.View style={styles.buttonShadowWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, styles.passButton]}
            onPress={handlePass}
          >
          <Text style={[styles.buttonText, styles.passButtonText]}>✕</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={styles.buttonShadowWrapper}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.button, styles.likeButton]}
            onPress={handleLike}
          >
            <Text style={styles.buttonText}>♥</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // soft vertical gradient illusion using two tones
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
  },
  card: {
    width: width * 0.9,
    height: 440,
    borderRadius: 20,
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    left: -20,
    right: -20,
    bottom: -30,
    height: 80,
    backgroundColor: colors.primarySoft,
    borderRadius: 40,
  },
  cardImage: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContent: {
    padding: 20,
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 15,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: colors.cardAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 32,
    paddingVertical: 24,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonShadowWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  passButton: {
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.danger,
  },
  likeButton: {
    backgroundColor: colors.accent,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  passButtonText: {
    color: colors.danger,
  },
  likeButtonText: {
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  resetButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;