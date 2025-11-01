import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { formatDuration } from '../utils/calculations';
import { format } from 'date-fns';

const RideHistoryScreen = ({ navigation }) => {
  const { selectedBike } = useBike();
  const { rides, loadRides } = useData();

  useEffect(() => {
    if (selectedBike) {
      loadRides(selectedBike.id);
    }
  }, [selectedBike]);

  const renderRide = ({ item }) => (
    <TouchableOpacity
      style={styles.rideCard}
      onPress={() => navigation.navigate('RideDetail', { ride: item })}
    >
      <Text style={styles.rideName}>{item.name}</Text>
      <Text style={styles.rideDate}>
        {item.startTime ? format(new Date(item.startTime.seconds * 1000), 'MMM dd, yyyy HH:mm') : 'N/A'}
      </Text>
      <View style={styles.rideStats}>
        <View style={styles.rideStat}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>{item.distance} km</Text>
        </View>
        <View style={styles.rideStat}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{formatDuration(item.duration)}</Text>
        </View>
        <View style={styles.rideStat}>
          <Text style={styles.statLabel}>Avg Speed</Text>
          <Text style={styles.statValue}>{item.avgSpeed} km/h</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        renderItem={renderRide}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No rides recorded yet</Text>
        }
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('RideRecord')}
      >
        <Text style={styles.addButtonText}>+ Record New Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  rideCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rideDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rideStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rideStat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
    marginTop: 3,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RideHistoryScreen;
