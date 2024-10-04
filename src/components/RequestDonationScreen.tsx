// src/components/RequestDonationScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';

// Dummy function to simulate sending a request to users
const sendDonationRequest = (bloodType: string) => {
  // Simulate sending a request
  // Here, you would typically call an API to notify users with the specified blood type
  console.log(`Request sent for blood type: ${bloodType}`);
  // Example response, in real scenario you would handle API response
  return true;
};

export default function RequestDonationScreen() {
  const [bloodType, setBloodType] = useState('');

  const handleRequest = () => {
    if (!bloodType) {
      Alert.alert('Error', 'Please specify a blood type.');
      return;
    }
    
    // Logic for requesting a donation
    const success = sendDonationRequest(bloodType);
    if (success) {
      Alert.alert('Success', 'Donation request submitted!');
      setBloodType(''); // Clear input after submission
    } else {
      Alert.alert('Error', 'Failed to submit the request. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Donation</Text>
      <Text style={styles.description}>
        If you need assistance, you can request a donation here.
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter blood type (e.g., A+, B-)"
        value={bloodType}
        onChangeText={setBloodType}
      />
      
      <Button title="Submit Request" onPress={handleRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
