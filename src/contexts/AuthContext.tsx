import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api/auth';

type User = {
  email: string;
  username: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (emailInput: string, passwordInput: string, usernameInput: string, phoneInput: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your authentication logic
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Implement your sign in logic here

    } catch (error) {
      throw error;
    }
  };

  const signUp = async (emailInput: string, passwordInput: string, usernameInput: string, phoneInput: string) => {
    try {
      // TODO: Implement your sign up logic here
      const {username, email, wa_number} = await authService.signUp({ email: emailInput, password: passwordInput, username: usernameInput, phone: phoneInput, confirmPassword: passwordInput });
      setUser({username, email, phone: wa_number});
      console.log(user);

    } catch (error) {
      // TODO: Handle error
    }
  };

  const signOut = async () => {
    try {
      // TODO: Implement your sign out logic here
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
