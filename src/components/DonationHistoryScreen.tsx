import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Define a TypeScript interface for a donation item
interface Donation {
  id: string;
  name: string;
  amount: number;
  date: string;
}

// Sample donation data
const donationData: Donation[] = [
  { id: '1', name: 'Ayaan', amount: 1000, date: '2023-01-15' },
  { id: '2', name: 'Aisha', amount: 500, date: '2023-04-20' },
  { id: '3', name: 'Omar', amount: 1200, date: '2023-09-10' },
  { id: '4', name: 'Fatima', amount: 800, date: '2023-12-05' },
  { id: '5', name: 'Jain', amount: 600, date: '2024-05-22' },
];

// Prepare data for the line chart
const lineChartData = {
  labels: donationData.map(item => item.date), // Dates for x-axis
  datasets: [
    {
      data: donationData.map(item => item.amount), // Amounts for y-axis
      strokeWidth: 2, // optional
    },
  ],
};

export default function DonationHistoryScreen() {
  const renderDonationItem = ({ item }: { item: Donation }) => (
    <View style={styles.donationItem}>
      <Text style={styles.donationName}>{item.name}</Text>
      <Text style={styles.donationDetails}>
        Date: {item.date}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donation History</Text>

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={lineChartData}
          width={320} // Adjust width as needed
          height={220}
          yAxisLabel="৳"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 86, 179, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#0056b3',
            },
          }}
          bezier
        />
      </View>

      {/* List of Donations */}
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
    backgroundColor: 'skyblue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  donationItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  donationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  donationDetails: {
    fontSize: 16,
    color: '#555',
  },
});
