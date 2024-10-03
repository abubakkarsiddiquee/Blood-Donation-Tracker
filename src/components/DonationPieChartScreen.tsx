// src/components/DonationPieChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const userDonations = [
  { year: 2023, amount: 1000 },
  { year: 2024, amount: 1500 },
  { year: 2025, amount: 1200 },
];

const DonationPieChart = () => {
  // Prepare data for the pie chart
  const data = userDonations.map((donation) => ({
    name: `Year ${donation.year}`,
    amount: donation.amount,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Donation Overview</Text>
      <PieChart
        data={data}
        width={300}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute // for absolute number display
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'sky-blue',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default DonationPieChart;
