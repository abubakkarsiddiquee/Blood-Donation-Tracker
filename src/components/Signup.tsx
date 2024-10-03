// src/screens/Signup.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Simple signup function to store email and password
  const handleSignup = () => {
    if (email && password) {
      navigation.navigate('Profile', { email }); // Navigate to Profile with user email
    } else {
      alert('Please fill in all fields.'); // Simple validation alert
    }
  };

  return (
    <View style={commonStyles.background}> {/* Common background style */}
      <View style={localStyles.container}> {/* Local styles for layout */}
        <Text style={localStyles.title}>Signup</Text>
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
        <Button title="Sign Up" onPress={handleSignup} color="#007BFF" /> {/* Button color */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={localStyles.link}>Already have an account? Login</Text>
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
    fontWeight: 'bold', // Bold for emphasis
    color: '#333', // Darker color for visibility
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5, // Rounded corners for input fields
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
    backgroundColor: '#e6f2ff', // Light blue background color for consistency
  },
});
