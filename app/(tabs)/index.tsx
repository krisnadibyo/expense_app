import { Link, router } from 'expo-router';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { useAuth } from '../../src/contexts/AuthContext';

export default function DashboardScreen() {
  const { token } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="headlineMedium">Dashboard</Text>
      <Text variant="bodyMedium">{token}</Text>
      <Button mode="contained" onPress={() => router.push('/login')}>Login</Button>
    </View>
  );  
} 