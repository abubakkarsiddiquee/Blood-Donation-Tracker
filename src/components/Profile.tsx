// src/components/Profile.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileProps {
  route: {
    params: {
      email: string;
      name: string;
      blood_type: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

export default function Profile({ route, navigation }: ProfileProps) {
  const { email, name = 'User', blood_type } = route.params; // Ensure name is provided

  const handleEditPress = () => {
    navigation.navigate('EditProfile', { email, name, blood_type });
  };

  const handleMenuPress = (menu: string) => {
    switch (menu) {
      case 'Find Donors':
        navigation.navigate('FindDonorsScreen');
        break;
      case 'Request Donation':
        navigation.navigate('RequestDonationScreen');
        break;
      case 'Donation History':
        navigation.navigate('DonationHistoryScreen');
        break;
      case 'Donation Pie Chart':
        navigation.navigate('DonationPieChartScreen'); // Navigate to the new screen
        break;
      case 'Logout':
        navigation.navigate('Login'); // Navigate to the login screen
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <View style={styles.profileContainer}>
          <TouchableOpacity onPress={handleEditPress}>
            <Image 
              source={require('../../assets/profile.png')}
              style={styles.sidebarImage} 
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileEmail}>{email}</Text>
          </View>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Find Donors')}>
            <Ionicons name="people-outline" size={24} color="#0056b3" />
            <Text style={styles.menuText}>Find Donors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Request Donation')}>
            <Ionicons name="add-circle-outline" size={24} color="#0056b3" />
            <Text style={styles.menuText}>Request Donation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Donation History')}>
            <Ionicons name="list-outline" size={24} color="#0056b3" />
            <Text style={styles.menuText}>Donation History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Donation Pie Chart')}>
            <Ionicons name="bar-chart" size={24} color="#0056b3" />
            <Text style={styles.menuText}>Donation Pie Chart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('Logout')}>
            <Ionicons name="log-out-outline" size={24} color="#ff4d4d" />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
        <Text>Select an option from the sidebar to continue.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'skyblue',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#ffffff',
    padding: 20,
    elevation: 5,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginVertical: 20,
  },
  profileContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    flexDirection: 'row',
  },
  sidebarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#555',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#0056b3',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f2ff',
    marginVertical: 20,
    marginLeft: 10,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
