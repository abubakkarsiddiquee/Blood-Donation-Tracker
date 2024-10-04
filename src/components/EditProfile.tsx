import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({ navigation }) {
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newBloodType, setNewBloodType] = useState('');
  const [userId, setUserId] = useState(null);  // Store the logged-in user's ID

  // Retrieve logged-in user's profile from AsyncStorage or backend
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Assuming user ID is saved in AsyncStorage after login
        const storedId = await AsyncStorage.getItem('user_id');
        const storedEmail = await AsyncStorage.getItem('user_email');
        const storedName = await AsyncStorage.getItem('user_name');
        const storedBloodType = await AsyncStorage.getItem('user_blood_type');

        if (storedId) {
          setUserId(storedId);  // Set the user ID
        } else {
          Alert.alert('Error', 'User ID is not available.');
        }

        if (storedEmail) setNewEmail(storedEmail);
        if (storedName) setNewName(storedName);
        if (storedBloodType) setNewBloodType(storedBloodType);
      } catch (error) {
        console.error('Failed to load user data:', error);
        Alert.alert('Error', 'Failed to load user data.');
      }
    };

    loadUserData();
  }, []);

  const handleSave = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID is missing, unable to update profile.');
      return;
    }

    try {
      const response = await fetch(`http://192.168.0.105:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          blood_type: newBloodType,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);  // Log the server response
        Alert.alert('Success', result.message || 'Profile updated successfully');  // Fallback message
        
        // Update AsyncStorage with new user data
        await AsyncStorage.setItem('user_email', newEmail);
        await AsyncStorage.setItem('user_name', newName);
        await AsyncStorage.setItem('user_blood_type', newBloodType);

        navigation.navigate('Profile', { email: newEmail, name: newName, blood_type: newBloodType });
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData);  // Log the error from the server
        Alert.alert('Error', errorData.message || 'Something went wrong');  // Fallback error message
      }
    } catch (error) {
      console.error('Error saving changes:', error);  // Log the actual error
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Blood Type"
        value={newBloodType} 
        onChangeText={setNewBloodType}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
