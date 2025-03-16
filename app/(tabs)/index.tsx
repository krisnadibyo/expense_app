import { View } from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';

export default function DashboardScreen() {
  const { token } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );  
} 