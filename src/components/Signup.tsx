import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to save user data to the backend
const saveUserToBackend = async (newName: string, newEmail: string, newBloodType: string, newPassword: string) => {
  try {
    const response = await fetch('http://192.168.0.105:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        blood_type: newBloodType,
        password: newPassword,
      }),
    });

    const responseData = await response.json();
    console.log('Response Data:', responseData);

    if (!response.ok) {
      throw new Error(responseData.message || 'Signup failed.');
    }

    return responseData; // Return the JSON result
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to connect to the server.'); // Throw an error to be caught in handleSignup
  }
};

export default function Signup({ navigation }: { navigation: any }) {
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBloodType, setNewBloodType] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Signup function that saves to the backend
  const handleSignup = async () => {
    if (newName && newEmail && newBloodType && newPassword) {
      try {
        const result = await saveUserToBackend(newName, newEmail, newBloodType, newPassword);

        // Ensure result is defined and contains the expected properties
        if (result && result.userId) {
          // Save the user ID and other details in AsyncStorage
          await AsyncStorage.setItem('user_id', result.userId.toString()); // Ensure it's a string
          await AsyncStorage.setItem('user_email', newEmail);
          await AsyncStorage.setItem('user_name', newName);
          await AsyncStorage.setItem('user_blood_type', newBloodType);
          
          // Navigate to the profile or another page
          navigation.navigate('Profile', {
            email: newEmail,
            name: newName,
            blood_type: newBloodType,
          });
        } else {
          Alert.alert('Error', 'Signup failed. No user ID returned.');
        }
      } catch (error) {
        console.error('Signup error:', error);
        Alert.alert('Error', error.message || 'Failed to signup. Please try again.');
      }
    } else {
      Alert.alert('Please fill in all fields.'); // Alert if fields are missing
    }
  };

  return (
    <View style={commonStyles.background}>
      <View style={localStyles.container}>
        <Text style={localStyles.title}>Signup</Text>

        <TextInput
          placeholder="Name"
          style={localStyles.input}
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          placeholder="Email"
          style={localStyles.input}
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          placeholder="Blood Type (e.g., A+, B-)"
          style={localStyles.input}
          value={newBloodType}
          onChangeText={setNewBloodType}
        />
        <TextInput
          placeholder="Password"
          style={localStyles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <Button title="Sign Up" onPress={handleSignup} color="#007BFF" />
        
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
