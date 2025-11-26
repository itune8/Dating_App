import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Gender = 'man' | 'woman' | 'everyone' | null;

export interface OnboardingProfile {
  phone: string;
  name: string;
  dob: string | null;
  city: string;
  gender: Gender;
  lookingFor: string;
}

interface AppStateContextValue {
  onboarded: boolean;
  loading: boolean;
  profile: OnboardingProfile | null;
  completeOnboarding: (profile: OnboardingProfile) => Promise<void>;
  resetOnboarding: () => Promise<void>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = '@dating_app_onboarding_v1';

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [onboarded, setOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as {
            onboarded: boolean;
            profile: OnboardingProfile | null;
          };
          setOnboarded(!!parsed.onboarded);
          setProfile(parsed.profile);
        }
      } catch (e) {
        // ignore for now
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const completeOnboarding = async (p: OnboardingProfile) => {
    setProfile(p);
    setOnboarded(true);
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ onboarded: true, profile: p }),
      );
    } catch (e) {
      // ignore
    }
  };

  const resetOnboarding = async () => {
    setOnboarded(false);
    setProfile(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  return (
    <AppStateContext.Provider
      value={{ onboarded, loading, profile, completeOnboarding, resetOnboarding }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppStateContextValue => {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
};
