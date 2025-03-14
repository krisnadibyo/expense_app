import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export function useProtectedRoute() {
  const {  token, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isLoginRoute = segments[0] === 'login';
    console.log(segments);
    console.log(token);

    if (!token && !isLoginRoute) {
      // Redirect to login if user is not authenticated
      router.replace('/login');
    } else if (token && isLoginRoute) {
      // Redirect to home if user is authenticated and trying to access auth screens
      router.replace('/');
    }
  }, [token, loading, segments]);
} 