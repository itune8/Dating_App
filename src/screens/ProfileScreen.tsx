import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const ProfileScreen: React.FC = () => {
  const [privacyMode, setPrivacyMode] = React.useState(true);
  const [incognito, setIncognito] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>My Profile</Text>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        </View>

        <View style={styles.topRow}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300',
            }}
            style={styles.avatar}
          />
          <View style={styles.topInfo}>
            <Text style={styles.name}>Alex, 26</Text>
            <Text style={styles.subtitle}>Product Designer • Bengaluru</Text>
            <Text style={styles.completion}>Profile 80% complete</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Intro</Text>
          <View style={styles.voiceCard}>
            <View style={styles.voiceWave} />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Play 0:12</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Micro Prompts</Text>
          <View style={styles.chipRow}>
            <Text style={styles.chip}>🌙 Night owl</Text>
            <Text style={styles.chip}>🏔️ Mountains</Text>
            <Text style={styles.chip}>📚 Books</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discovery Preferences</Text>
          <Text style={styles.preferenceText}>Looking for: Relationship</Text>
          <Text style={styles.preferenceText}>Show me: Women</Text>
          <Text style={styles.preferenceText}>Age range: 23 - 30</Text>
          <Text style={styles.preferenceText}>Distance: up to 20 km</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Safety</Text>
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabels}>
              <Text style={styles.toggleTitle}>Blur photos until match</Text>
              <Text style={styles.toggleSubtitle}>Keep your profile discreet in Discover.</Text>
            </View>
            <Switch
              value={privacyMode}
              onValueChange={setPrivacyMode}
              thumbColor={privacyMode ? colors.accent : '#6B7280'}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleLabels}>
              <Text style={styles.toggleTitle}>Incognito mode</Text>
              <Text style={styles.toggleSubtitle}>Only people you like will see you.</Text>
            </View>
            <Switch
              value={incognito}
              onValueChange={setIncognito}
              thumbColor={incognito ? colors.accent : '#6B7280'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonText}>Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowButton}>
            <Text style={styles.rowButtonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowButton, styles.dangerRow]}>
            <Text style={[styles.rowButtonText, styles.dangerText]}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  verifiedBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  verifiedText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  topInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  completion: {
    fontSize: 12,
    color: colors.accent,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  voiceCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  voiceWave: {
    height: 30,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    marginBottom: 10,
  },
  primaryButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: '#F9FAFB',
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.cardAlt,
    color: colors.textPrimary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 13,
  },
  preferenceText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  toggleLabels: {
    flex: 1,
    marginRight: 10,
  },
  toggleTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  toggleSubtitle: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  rowButton: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  dangerRow: {
    marginTop: 8,
  },
  dangerText: {
    color: colors.danger,
  },
});

export default ProfileScreen;
