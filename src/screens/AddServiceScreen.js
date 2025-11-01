import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { scheduleServiceReminder } from '../services/notificationService';

const AddServiceScreen = ({ navigation }) => {
  const { selectedBike } = useBike();
  const { addServiceRecord } = useData();
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [odometer, setOdometer] = useState('');
  const [cost, setCost] = useState('');
  const [nextServiceKm, setNextServiceKm] = useState('');

  useEffect(() => {
    if (selectedBike) {
      setOdometer(selectedBike.currentOdometer.toString());
    }
  }, [selectedBike]);

  const handleSave = async () => {
    if (!type || !odometer || !cost) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const serviceData = {
      type,
      description,
      odometer: parseFloat(odometer),
      cost: parseFloat(cost),
      nextServiceKm: nextServiceKm ? parseFloat(nextServiceKm) : null,
      date: new Date(),
    };

    const result = await addServiceRecord(serviceData);
    if (result.success) {
      if (nextServiceKm && selectedBike) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 30);
        await scheduleServiceReminder(
          selectedBike.id,
          selectedBike.name,
          type,
          dueDate,
          nextServiceKm
        );
      }
      Alert.alert('Success', 'Service record added successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Service Type *</Text>
        <TextInput
          style={styles.input}
          value={type}
          onChangeText={setType}
          placeholder="e.g., Oil Change, Tire Replacement"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Additional details (optional)"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Odometer (km) *</Text>
        <TextInput
          style={styles.input}
          value={odometer}
          onChangeText={setOdometer}
          placeholder="Current odometer reading"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Cost *</Text>
        <TextInput
          style={styles.input}
          value={cost}
          onChangeText={setCost}
          placeholder="Service cost"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Next Service Due (km)</Text>
        <TextInput
          style={styles.input}
          value={nextServiceKm}
          onChangeText={setNextServiceKm}
          placeholder="e.g., 10000 (optional)"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Service Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddServiceScreen;
