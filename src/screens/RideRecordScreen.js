import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Polyline } from 'react-native-maps';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { calculateDistance, calculateSpeed, formatDuration } from '../utils/calculations';

const RideRecordScreen = ({ navigation }) => {
  const { selectedBike } = useBike();
  const { addRideRecord } = useData();
  const [isRecording, setIsRecording] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    requestLocationPermission();
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording && startTime) {
      interval = setInterval(() => {
        setCurrentDuration(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, startTime]);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permission is required to track rides');
    }
  };

  const handleStartRide = async () => {
    if (!selectedBike) {
      Alert.alert('Error', 'Please select a bike first');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const initialCoord = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      timestamp: Date.now(),
    };

    setCoordinates([initialCoord]);
    setStartTime(Date.now());
    setIsRecording(true);
    setRegion({
      latitude: initialCoord.latitude,
      longitude: initialCoord.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (location) => {
        const newCoord = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          altitude: location.coords.altitude,
          timestamp: Date.now(),
        };
        setCoordinates((prev) => [...prev, newCoord]);
      }
    );

    setLocationSubscription(subscription);
  };

  const handleStopRide = async () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }

    const endTime = Date.now();
    const duration = endTime - startTime;
    const distance = calculateDistance(coordinates);
    const avgSpeed = calculateSpeed(distance, duration);

    const maxSpeed = coordinates.reduce((max, coord, index) => {
      if (index === 0) return 0;
      const segmentDistance = calculateDistance([coordinates[index - 1], coord]);
      const segmentDuration = coord.timestamp - coordinates[index - 1].timestamp;
      const speed = parseFloat(calculateSpeed(segmentDistance, segmentDuration));
      return Math.max(max, speed);
    }, 0);

    const rideData = {
      coordinates,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration,
      distance: distance.toFixed(2),
      avgSpeed,
      maxSpeed: maxSpeed.toFixed(2),
      name: `Ride ${new Date(startTime).toLocaleDateString()}`,
    };

    const result = await addRideRecord(rideData);
    if (result.success) {
      Alert.alert('Success', 'Ride saved successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', result.error);
    }

    setIsRecording(false);
    setCoordinates([]);
    setStartTime(null);
    setCurrentDuration(0);
  };

  const distance = calculateDistance(coordinates);
  const avgSpeed = currentDuration > 0 ? calculateSpeed(distance, currentDuration) : 0;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
        followsUserLocation
      >
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates}
            strokeColor="#4285F4"
            strokeWidth={4}
          />
        )}
      </MapView>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Duration</Text>
          <Text style={styles.statValue}>{formatDuration(currentDuration)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Distance</Text>
          <Text style={styles.statValue}>{distance.toFixed(2)} km</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Avg Speed</Text>
          <Text style={styles.statValue}>{avgSpeed} km/h</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        {!isRecording ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStartRide}>
            <Text style={styles.buttonText}>Start Ride</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={handleStopRide}>
            <Text style={styles.buttonText}>Stop & Save Ride</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  statsContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  startButton: {
    backgroundColor: '#34A853',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#EA4335',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RideRecordScreen;
