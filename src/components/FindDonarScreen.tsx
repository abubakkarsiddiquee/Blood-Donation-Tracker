// src/screens/FindDonorsScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const donorsData = [
  { id: '1', name: 'Sohail', bloodType: 'A+', distance: '5 km' },
  { id: '2', name: 'Lily', bloodType: 'B-', distance: '10 km' },
  { id: '3', name: 'Noor', bloodType: 'O+', distance: '3 km' },
  { id: '4', name: 'Karim', bloodType: 'AB+', distance: '8 km' },
  { id: '5', name: 'Sarah', bloodType: 'A-', distance: '12 km' },
  { id: '6', name: 'Tariq', bloodType: 'B+', distance: '7 km' },
  { id: '7', name: 'Amina', bloodType: 'O-', distance: '2 km' },
  { id: '8', name: 'Zara', bloodType: 'AB-', distance: '4 km' },
  { id: '9', name: 'Ali', bloodType: 'A+', distance: '6 km' },
  { id: '10', name: 'Rania', bloodType: 'B-', distance: '9 km' },
  { id: '11', name: 'Omar', bloodType: 'O+', distance: '3 km' },
  { id: '12', name: 'Fatima', bloodType: 'AB+', distance: '11 km' },
  { id: '13', name: 'Usman', bloodType: 'A-', distance: '15 km' },
  { id: '14', name: 'Sana', bloodType: 'B+', distance: '6 km' },
  { id: '15', name: 'Hassan', bloodType: 'O-', distance: '2 km' },
  { id: '16', name: 'Nadia', bloodType: 'AB-', distance: '9 km' },
  { id: '17', name: 'Bilal', bloodType: 'A+', distance: '4 km' },
  { id: '18', name: 'Amira', bloodType: 'B-', distance: '8 km' },
  { id: '19', name: 'Farhan', bloodType: 'O+', distance: '5 km' },
  { id: '20', name: 'Layla', bloodType: 'AB+', distance: '10 km' },
  { id: '21', name: 'Imran', bloodType: 'A-', distance: '12 km' },
  { id: '22', name: 'Zain', bloodType: 'B+', distance: '7 km' },
  { id: '23', name: 'Maya', bloodType: 'O-', distance: '3 km' },
  { id: '24', name: 'Rashid', bloodType: 'AB-', distance: '6 km' },
  { id: '25', name: 'Aisha', bloodType: 'A+', distance: '11 km' },
  { id: '26', name: 'Sami', bloodType: 'B-', distance: '8 km' },
  { id: '27', name: 'Khadija', bloodType: 'O+', distance: '2 km' },
  { id: '28', name: 'Yusuf', bloodType: 'AB+', distance: '5 km' },
  { id: '29', name: 'Noha', bloodType: 'A-', distance: '10 km' },
  { id: '30', name: 'Zainab', bloodType: 'B+', distance: '4 km' },
  { id: '31', name: 'Mansoor', bloodType: 'O-', distance: '6 km' },
  { id: '32', name: 'Samira', bloodType: 'AB-', distance: '9 km' },
  { id: '33', name: 'Fahad', bloodType: 'A+', distance: '3 km' },
  { id: '34', name: 'Mira', bloodType: 'B-', distance: '8 km' },
  { id: '35', name: 'Rami', bloodType: 'O+', distance: '12 km' },
  { id: '36', name: 'Huda', bloodType: 'AB+', distance: '7 km' },
  { id: '37', name: 'Salman', bloodType: 'A-', distance: '5 km' },
  { id: '38', name: 'Hana', bloodType: 'B+', distance: '10 km' },
  { id: '39', name: 'Arif', bloodType: 'O-', distance: '4 km' },
  { id: '40', name: 'Zahra', bloodType: 'AB-', distance: '6 km' },
  { id: '41', name: 'Said', bloodType: 'A+', distance: '3 km' },
  { id: '42', name: 'Rania', bloodType: 'B-', distance: '8 km' },
  { id: '43', name: 'Kareem', bloodType: 'O+', distance: '10 km' },
  { id: '44', name: 'Saira', bloodType: 'AB+', distance: '5 km' },
  { id: '45', name: 'Rafique', bloodType: 'A-', distance: '7 km' },
  { id: '46', name: 'Mina', bloodType: 'B+', distance: '9 km' },
  { id: '47', name: 'Jamil', bloodType: 'O-', distance: '3 km' },
  { id: '48', name: 'Laila', bloodType: 'AB-', distance: '6 km' },
  { id: '49', name: 'Sadiq', bloodType: 'A+', distance: '11 km' },
  { id: '50', name: 'Sophie', bloodType: 'B-', distance: '8 km' },
  { id: '51', name: 'Raza', bloodType: 'O+', distance: '2 km' },
  { id: '52', name: 'Hala', bloodType: 'AB+', distance: '5 km' },
  { id: '53', name: 'Aliya', bloodType: 'A-', distance: '10 km' },
  { id: '54', name: 'Bilqis', bloodType: 'B+', distance: '12 km' },
  { id: '55', name: 'Murtaza', bloodType: 'O-', distance: '4 km' },
  { id: '56', name: 'Zayn', bloodType: 'AB-', distance: '6 km' },
  { id: '57', name: 'Yasmin', bloodType: 'A+', distance: '8 km' },
  { id: '58', name: 'Yasir', bloodType: 'B-', distance: '9 km' },
  { id: '59', name: 'Zafira', bloodType: 'O+', distance: '3 km' },
  { id: '60', name: 'Safa', bloodType: 'AB+', distance: '10 km' },
  { id: '61', name: 'Ibtisam', bloodType: 'A-', distance: '5 km' },
  { id: '62', name: 'Naima', bloodType: 'B+', distance: '6 km' },
  { id: '63', name: 'Zakir', bloodType: 'O-', distance: '2 km' },
  { id: '64', name: 'Yasmeen', bloodType: 'AB-', distance: '7 km' },
  { id: '65', name: 'Haroon', bloodType: 'A+', distance: '8 km' },
  { id: '66', name: 'Hassan', bloodType: 'B-', distance: '11 km' },
  { id: '67', name: 'Shahida', bloodType: 'O+', distance: '4 km' },
  { id: '68', name: 'Omer', bloodType: 'AB+', distance: '9 km' },
  { id: '69', name: 'Reema', bloodType: 'A-', distance: '6 km' },
  { id: '70', name: 'Tariq', bloodType: 'B+', distance: '5 km' },
  { id: '71', name: 'Rida', bloodType: 'O-', distance: '12 km' },
  { id: '72', name: 'Haseeb', bloodType: 'AB-', distance: '3 km' },
  { id: '73', name: 'Naheed', bloodType: 'A+', distance: '10 km' },
  { id: '74', name: 'Muneeb', bloodType: 'B-', distance: '8 km' },
  { id: '75', name: 'Nawal', bloodType: 'O+', distance: '6 km' },
  { id: '76', name: 'Zafar', bloodType: 'AB+', distance: '5 km' },
  { id: '77', name: 'Fiza', bloodType: 'A-', distance: '7 km' },
  { id: '78', name: 'Bilal', bloodType: 'B+', distance: '11 km' },
  { id: '79', name: 'Yasir', bloodType: 'O-', distance: '4 km' },
  { id: '80', name: 'Amal', bloodType: 'AB-', distance: '10 km' },
  { id: '81', name: 'Zunaid', bloodType: 'A+', distance: '6 km' },
  { id: '82', name: 'Hiba', bloodType: 'B-', distance: '3 km' },
  { id: '83', name: 'Kashan', bloodType: 'O+', distance: '8 km' },
  { id: '84', name: 'Dina', bloodType: 'AB+', distance: '12 km' },
  { id: '85', name: 'Tariq', bloodType: 'A-', distance: '5 km' },
  { id: '86', name: 'Qasim', bloodType: 'B+', distance: '9 km' },
  { id: '87', name: 'Rehan', bloodType: 'O-', distance: '2 km' },
  { id: '88', name: 'Nida', bloodType: 'AB-', distance: '6 km' },
  { id: '89', name: 'Azhar', bloodType: 'A+', distance: '7 km' },
  { id: '90', name: 'Ranya', bloodType: 'B-', distance: '4 km' },
  { id: '91', name: 'Usama', bloodType: 'O+', distance: '8 km' },
  { id: '92', name: 'Raziya', bloodType: 'AB+', distance: '10 km' },
  { id: '93', name: 'Sabeen', bloodType: 'A-', distance: '11 km' },
  { id: '94', name: 'Murtaza', bloodType: 'B+', distance: '6 km' },
  { id: '95', name: 'Haleema', bloodType: 'O-', distance: '2 km' },
  { id: '96', name: 'Fariha', bloodType: 'AB-', distance: '5 km' },
  { id: '97', name: 'Arwa', bloodType: 'A+', distance: '10 km' },
  { id: '98', name: 'Saad', bloodType: 'B-', distance: '4 km' },
  { id: '99', name: 'Ruqayya', bloodType: 'O+', distance: '8 km' },
  { id: '100', name: 'Zeeshan', bloodType: 'AB+', distance: '6 km' }
];


export default function FindDonorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter donors by name or blood type
  const filteredDonors = donorsData.filter(donor =>
    donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
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
        placeholder="Search for donors by name or blood type..."
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
    backgroundColor: 'skyblue',
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
