import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Link, router } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

export default function LoginScreen() {
  const [identity,  setIdentity] = useState('user_test1');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');
  const {signIn, loading } = useAuth();

  const handleLogin = async () => {
    try {
      setError('');
      await signIn(identity, password);
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Welcome Back</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        label="Email/Username/Phone"
        value={identity}
        onChangeText={setIdentity}
        autoCapitalize="none"
        keyboardType="default"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {loading ? 'Logging in...' : 'Login'} 
      </Button>

      <Link href="/register" asChild>
        <Button mode="text">Don't have an account? Register</Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
}); 