// src/components/DonationHistoryScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const donationData = [
  { id: '1', name: 'Ayaan', amount: 1000, date: '2023-01-15' },
  { id: '2', name: 'Aisha', amount: 500, date: '2023-02-20' },
  { id: '3', name: 'Omar', amount: 1200, date: '2023-03-10' },
  { id: '4', name: 'Fatima', amount: 800, date: '2023-04-05' },
  { id: '5', name: 'Zain', amount: 600, date: '2023-05-22' },
];

export default function DonationHistoryScreen() {
  const renderDonationItem = ({ item }) => (
    <View style={styles.donationItem}>
      <Text style={styles.donationName}>{item.name}</Text>
      <Text style={styles.donationDetails}>
        Amount: ৳{item.amount} | Date: {item.date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation History</Text>
      <FlatList
        data={donationData}
        renderItem={renderDonationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background for better readability
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  donationItem: {
    backgroundColor: '#fff', // White background for donation items
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000', // Adding shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow effect
  },
  donationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  donationDetails: {
    fontSize: 16,
    color: '#555', // Subtle text color for details
  },
});
