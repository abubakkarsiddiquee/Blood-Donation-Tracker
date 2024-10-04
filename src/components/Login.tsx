import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Function to check login credentials with backend
const checkLogin = async (email: string, password: string) => {
  try {
    const response = await fetch('http://192.168.0.105:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return true; // Success
  } catch (error) {
    console.error('Error:', error);
    return false; // Failed login
  }
};

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      const success = await checkLogin(email, password);
      if (success) {
        navigation.navigate('Profile', { email });
      } else {
        alert('Invalid email or password.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <View style={commonStyles.background}>
      <View style={localStyles.container}>
        <Text style={localStyles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          style={localStyles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={localStyles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Login" onPress={handleLogin} color="#007BFF" />
        
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={localStyles.link}>Don't have an account? Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    color: 'blue',
    textAlign: 'center',
  },
});

const commonStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
});
