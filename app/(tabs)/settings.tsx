import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuth } from '../../src/contexts/AuthContext';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>Settings</Text>
      <Button mode="contained" onPress={signOut}>
        Sign Out
      </Button>
    </View>
  );
} 