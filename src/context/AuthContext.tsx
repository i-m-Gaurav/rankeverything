import React, { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { authClient } from '../lib/auth-client';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const session = authClient.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const syncUser = useMutation(api.users.syncUser);
  const hasSynced = useRef<string | null>(null);

  const user: AuthUser | null = session.data?.user
    ? {
        id: session.data.user.id,
        name: session.data.user.name,
        email: session.data.user.email,
        image: session.data.user.image ?? undefined,
      }
    : null;

  // Sync user to our database whenever session changes
  useEffect(() => {
    if (user && hasSynced.current !== user.id) {
      hasSynced.current = user.id;
      syncUser({
        name: user.name || 'Anonymous',
        email: user.email,
        image: user.image,
        provider: user.image ? 'google' : 'email', // Google users typically have an image
      }).catch((err) => {
        console.error('Failed to sync user:', err);
        // Don't block the UI if sync fails
      });
    }
  }, [user, syncUser]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      if (result.error) {
        throw new Error(result.error.message || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authClient.signUp.email({
        name: username,
        email,
        password,
      });
      if (result.error) {
        throw new Error(result.error.message || 'Registration failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      });
    } catch (err) {
      console.error('Google sign-in error:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    hasSynced.current = null;
    authClient.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        signInWithGoogle,
        logout,
        isLoading: isLoading || session.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
