import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Temporary hardcoded email/password for this example
    if (email === 'a@gmail.com' && password === '1233') {
      navigation.navigate('Profile', { email, name: 'User' }); // Go to profile if valid
      setErrorMessage(''); // Clear error message
    } else {
      setErrorMessage('Invalid credentials!'); // Set error message to be displayed
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#007BFF" />
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Don't have an account? 
            <Text style={styles.linkHighlight}> Sign Up</Text> {/* Ensure no text is outside of <Text> */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f4f6f8', // Light gray professional background
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#ffffff', // White box for form inputs
    marginHorizontal: 20,
    borderRadius: 10, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Soft shadow for the container
    elevation: 3, // Elevation for Android shadow
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333', // Darker color for title
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
    textAlign: 'center',
    color: '#555', // Neutral gray for link text
  },
  linkHighlight: {
    color: '#007BFF', // More beautiful blue highlight for 'Sign Up'
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
});
