// Auth and Onboarding Types

export interface SignupData {
  fullName: string;
  email: string;
  phone: string; // Without +91 prefix
}

export interface BasicProfileData {
  dateOfBirth: string; // ISO date string
  gender: 'male' | 'female' | 'prefer-not-to-say';
}

export interface PreferencesData {
  showMe: 'men' | 'women' | 'both';
  ageRange: {
    min: number;
    max: number;
  };
  distanceRange: number; // in km
  lifestylePreferences?: {
    smoking?: boolean;
    drinking?: boolean;
    relationshipGoals?: string;
  };
}

export interface InterestsData {
  interests: string[];
  bio: string;
  photos: File[]; // At least 1 required
}

export interface OnboardingData {
  signup: SignupData;
  basicProfile: BasicProfileData;
  preferences: PreferencesData;
  interests: InterestsData;
}

export interface LoginData {
  email?: string;
  phone?: string; // Without +91 prefix
}

