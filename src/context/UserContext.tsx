import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the user profile
export interface UserProfile {
  fullName: string;
  email: string;
  currentJobTitle: string;
  yearsExperience: string;
  qualification: string;
  desiredJobTitle: string;
  industries: string[];
  locations: string[];
  skills: string[];
  isOnboarded: boolean;
  // Subscription & Usage
  subscriptionTier: 'Free' | 'Basic' | 'Pro' | 'Unlimited';
  matchesUsed: number;
  matchesLimit: number;
  // Application Tracking
  applications: string[]; // List of Company IDs
  interviews: number;
}

interface UserContextType {
  profile: UserProfile | null;
  updateProfile: (data: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  incrementMatchesUsed: () => boolean; // Returns true if successful
  addApplication: (companyId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Guest User',
  email: 'user@example.com',
  currentJobTitle: '',
  yearsExperience: '',
  qualification: '',
  desiredJobTitle: '',
  industries: [],
  locations: [],
  skills: [],
  isOnboarded: false,
  subscriptionTier: 'Free',
  matchesUsed: 0,
  matchesLimit: 5, // Free tier limit
  applications: [],
  interviews: 0
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    // Try to load from local storage to persist across refreshes
    const saved = localStorage.getItem('sponsorpath_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (profile) {
      localStorage.setItem('sponsorpath_user', JSON.stringify(profile));
    }
  }, [profile]);

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => {
      const newProfile = prev ? { ...prev, ...data } : { ...DEFAULT_PROFILE, ...data };
      return newProfile;
    });
  };

  const completeOnboarding = () => {
    updateProfile({ isOnboarded: true });
  };

  const incrementMatchesUsed = () => {
    if (!profile) return false;
    if (profile.matchesUsed >= profile.matchesLimit) return false;

    updateProfile({ matchesUsed: profile.matchesUsed + 1 });
    return true;
  };

  const addApplication = (companyId: string) => {
    if (!profile) return;
    if (!profile.applications.includes(companyId)) {
      updateProfile({ applications: [...profile.applications, companyId] });
    }
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, completeOnboarding, incrementMatchesUsed, addApplication }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
