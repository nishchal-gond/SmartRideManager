import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const { loginAnonymous, loginWithGoogle } = useAuth();

  const handleAnonymousLogin = async () => {
    const result = await loginAnonymous();
    if (!result.success) {
      alert('Login failed: ' + result.error);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    if (!result.success) {
      alert('Google login failed: ' + result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SmartRide Manager</Text>
      <Text style={styles.subtitle}>Track your rides, fuel, and maintenance</Text>
      
      <TouchableOpacity style={styles.buttonGoogle} onPress={handleGoogleLogin}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonAnonymous} onPress={handleAnonymousLogin}>
        <Text style={styles.buttonTextAnonymous}>Continue without account</Text>
      </TouchableOpacity>
      
      <Text style={styles.infoText}>
        Note: Anonymous mode does not sync data to cloud
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonGoogle: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonAnonymous: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextAnonymous: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default LoginScreen;
