import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { exportServicesToCSV } from '../utils/exportUtils';
import { format } from 'date-fns';

const ServiceListScreen = ({ navigation }) => {
  const { selectedBike } = useBike();
  const { services, loadServices } = useData();

  useEffect(() => {
    if (selectedBike) {
      loadServices(selectedBike.id);
    }
  }, [selectedBike]);

  const handleExport = async () => {
    const result = await exportServicesToCSV(services);
    if (result.success) {
      alert('Service records exported successfully');
    } else {
      alert('Export failed: ' + result.error);
    }
  };

  const renderService = ({ item }) => (
    <View style={styles.serviceCard}>
      <Text style={styles.serviceType}>{item.type}</Text>
      <Text style={styles.serviceDate}>
        {item.date ? format(new Date(item.date.seconds * 1000), 'MMM dd, yyyy') : 'N/A'}
      </Text>
      <Text style={styles.serviceInfo}>Odometer: {item.odometer} km</Text>
      <Text style={styles.serviceInfo}>Cost: ${item.cost?.toFixed(2)}</Text>
      {item.description && (
        <Text style={styles.serviceDescription}>{item.description}</Text>
      )}
      {item.nextServiceKm && (
        <Text style={styles.nextService}>Next Service: {item.nextServiceKm} km</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No service records yet</Text>
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.exportButton]}
          onPress={handleExport}
          disabled={services.length === 0}
        >
          <Text style={styles.buttonText}>Export CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate('AddService')}
        >
          <Text style={styles.buttonText}>+ Add Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  serviceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  serviceInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    fontStyle: 'italic',
  },
  nextService: {
    fontSize: 14,
    color: '#4285F4',
    fontWeight: 'bold',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4285F4',
  },
  exportButton: {
    backgroundColor: '#34A853',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiceListScreen;
