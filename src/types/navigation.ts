export type OnboardingStackParamList = {
  Phone: undefined;
  Otp: { phone: string };
  BasicInfo: { phone: string };
  Preferences: {
    phone: string;
    name: string;
    city: string;
    dob: string | null;
  };
  Done: undefined;
};
