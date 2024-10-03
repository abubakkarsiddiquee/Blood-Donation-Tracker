// src/components/RequestDonationScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function RequestDonationScreen() {
  const handleRequest = () => {
    // Logic for requesting a donation goes here
    alert('Donation request submitted!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Donation</Text>
      <Text style={styles.description}>
        If you need assistance, you can request a donation here.
      </Text>
      <Button title="Submit Request" onPress={handleRequest} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  },
});
