// App.tsx or a similar entry file
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Profile from './src/components/Profile'; // Fixed the import statement
import EditProfile from './src/components/EditProfile';
import FindDonorsScreen from './src/components/FindDonarScreen';
import RequestDonationScreen from './src/components/RequestDonationScreen';
import DonationHistoryScreen from './src/components/DonationHistoryScreen';
import DonationPieChartScreen from './src/components/DonationPieChartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="FindDonorsScreen" component={FindDonorsScreen} />
        <Stack.Screen name= "RequestDonationScreen" component={RequestDonationScreen}/>
        <Stack.Screen name = "DonationHistoryScreen" component={DonationHistoryScreen}/>
        <Stack.Screen name="DonationPieChartScreen" component={DonationPieChartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
