import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api/auth';
import { isEmail } from '../utils/stringUtils';
import { isPhoneNumber } from '../utils/stringUtils';
import { LoginResponse } from '../types/auth';
import { preferences } from '../services/storage/secureStorage';

type AuthContextType = {
  token: string | null;
  loading: boolean;
  signIn: (identity: string, password: string) => Promise<void>;
  signUp: (
    emailInput: string,
    passwordInput: string,
    usernameInput: string,
    phoneInput: string
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const token_from_storage = await preferences.getValue('token');
      if (token_from_storage) {
        setToken(token_from_storage);
      }
    };
    fetchToken();
    setLoading(false);
  }, []);

  const signIn = async (identity: string, password: string) => {
    try {
      // TODO: Implement your sign in logic here
      setLoading(true);
      let response: LoginResponse;
      if (isEmail(identity)) {
        response = await authService.signIn({ email: identity, password: password });
      } else if (isPhoneNumber(identity)) {
        response = await authService.signIn({ wa_number: identity, password: password });
      } else {
        response = await authService.signIn({ username: identity, password: password });
      }

      if (response) {
        setToken(response.access_token);
        await preferences.setValue('token', response.access_token);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    emailInput: string,
    passwordInput: string,
    usernameInput: string,
    phoneInput: string
  ) => {
    try {
      setLoading(true);
      await authService.signUp({
        email: emailInput,
        password: passwordInput,
        username: usernameInput,
        phone: phoneInput,
        confirmPassword: passwordInput,
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setToken(null);
      await preferences.deleteValue('token');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
