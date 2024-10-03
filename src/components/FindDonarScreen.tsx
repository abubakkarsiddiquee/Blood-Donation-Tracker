// src/screens/FindDonorsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const donorsData = [
  { id: '1', name: 'Sohail', bloodType: 'A+', distance: '5 km' },
  { id: '2', name: 'Lily', bloodType: 'B-', distance: '10 km' },
  { id: '3', name: 'Noor', bloodType: 'O+', distance: '3 km' },
  { id: '4', name: 'Karim', bloodType: 'AB+', distance: '8 km' },
  { id: '5', name: 'Sarah', bloodType: 'A-', distance: '12 km' },
];

export default function FindDonorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDonors = donorsData.filter(donor =>
    donor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDonorItem = ({ item }) => (
    <TouchableOpacity style={styles.donorItem}>
      <Text style={styles.donorName}>{item.name}</Text>
      <Text style={styles.donorInfo}>Blood Type: {item.bloodType}</Text>
      <Text style={styles.donorInfo}>Distance: {item.distance}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Donors</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for donors..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredDonors}
        renderItem={renderDonorItem}
        keyExtractor={item => item.id}
        style={styles.donorList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  donorList: {
    marginTop: 10,
  },
  donorItem: {
    backgroundColor: '#fff', // White background for donor item
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2, // Shadow for depth
  },
  donorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  donorInfo: {
    fontSize: 14,
    color: '#555', // Subtle color for donor info
  },
});
