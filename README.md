# Dating App 💕

A modern dating app built with React Native, featuring a beautiful UI with soft pink theming, smooth animations, and a complete onboarding flow.

## Features

### ✨ Core Features
- **Onboarding Flow**: Complete user registration with phone verification (mock), basic info collection, and preference setup
- **Discover Screen**: Swipeable profile cards with smooth animations and visual effects
- **Matches**: View and manage your matches with message previews
- **Profile**: User profile management with privacy settings and preferences
- **Local Storage**: All user data stored locally using AsyncStorage

### 🎨 Design
- Light pink dating app aesthetic with soft gradients
- Smooth card animations and transitions
- Neon accent colors for interactive elements
- Tab-based navigation for easy access

## Tech Stack

- **React Native** 0.82.1
- **TypeScript**
- **React Navigation** (Stack & Bottom Tabs)
- **AsyncStorage** for local data persistence
- **React Native Gesture Handler**
- **React Native Safe Area Context**
- **DateTimePicker** for date selection

## Project Structure

```
src/
├── context/
│   └── AppStateContext.tsx       # Global state management
├── navigation/
│   ├── AppNavigator.tsx          # Root navigator
│   ├── MainTabs.tsx              # Bottom tab navigation
│   └── OnboardingNavigator.tsx   # Onboarding flow
├── screens/
│   ├── HomeScreen.tsx            # Discover/swipe screen
│   ├── MatchesScreen.tsx         # Matches list
│   ├── ProfileScreen.tsx         # User profile
│   └── onboarding/
│       ├── PhoneScreen.tsx       # Phone number entry
│       ├── OtpScreen.tsx         # OTP verification (mock)
│       ├── BasicInfoScreen.tsx   # Name, DOB, city
│       └── PreferencesScreen.tsx # Gender & relationship preferences
├── theme/
│   └── colors.ts                 # App color palette
└── types/
    └── navigation.ts             # TypeScript navigation types
```

## Getting Started

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode (for iOS)
- CocoaPods

### Installation

1. Clone the repository:
```bash
git clone https://github.com/itune8/Dating_App.git
cd Dating_App/DatingApp
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS pods:
```bash
cd ios && pod install && cd ..
```

### Running the App

#### iOS
```bash
npx react-native run-ios --simulator "iPhone 17"
```

#### Android
```bash
npx react-native run-android
```

### Development

Start Metro bundler:
```bash
npx react-native start
```

Reset Metro cache (if needed):
```bash
npx react-native start --reset-cache
```

## Current Status

### ✅ Completed
- [x] Initial React Native setup with TypeScript
- [x] Bottom tab navigation (Discover, Matches, Profile)
- [x] Onboarding flow with local storage
- [x] Animated Discover screen with profile cards
- [x] Matches list UI
- [x] Profile screen with settings
- [x] Light pink dating theme

### 🚧 In Progress / Planned
- [ ] Swipe gestures for like/pass
- [ ] Photo upload and gallery
- [ ] Voice intro recording
- [ ] Micro prompts and vibe score
- [ ] Chat functionality
- [ ] Face verification UI
- [ ] Premium features UI
- [ ] Backend integration

## Demo Flow

1. **First Launch**: User sees onboarding
   - Enter phone number
   - Verify OTP (auto-filled with `123456`)
   - Enter name, DOB, and city
   - Select gender preferences and relationship intent
   
2. **Main App**: After onboarding, user lands on:
   - **Discover Tab**: Browse profiles with like/pass buttons
   - **Matches Tab**: See matched users and recent conversations
   - **Profile Tab**: View and edit profile, adjust settings

3. **Data Persistence**: On app restart, onboarding is skipped if already completed

## Notes

- This is a **frontend-only MVP** with mock data
- No real SMS verification (demo code: `123456`)
- All data stored locally using AsyncStorage
- Firebase and backend integration removed for simplicity

## License

MIT

## Author

Built with ❤️ by itune8
