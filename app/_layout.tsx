import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../src/constants/theme';
import { AuthProvider } from '../src/contexts/AuthContext';
import { useProtectedRoute } from '../src/hooks/useProtectedRoute';

function RootLayoutNav() {
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false, title: 'Login new' }} />
      <Stack.Screen name="register" options={{ headerShown: false, title: 'Register' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false, title: 'Not found' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </PaperProvider>
  );
} 