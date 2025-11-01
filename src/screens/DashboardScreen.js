import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryBar, VictoryPie } from 'victory-native';
import { useAuth } from '../context/AuthContext';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { calculateMonthlyFuelCost, calculateExpenseBreakdown } from '../utils/calculations';

const DashboardScreen = ({ navigation }) => {
  const { user, isAnonymous } = useAuth();
  const { selectedBike, bikes } = useBike();
  const { fuels, services, rides, expenses, loadFuels, loadServices, loadRides, loadExpenses } = useData();
  const [monthlyFuelData, setMonthlyFuelData] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);

  useEffect(() => {
    if (selectedBike) {
      loadData();
    }
  }, [selectedBike]);

  useEffect(() => {
    if (fuels.length > 0) {
      const data = calculateMonthlyFuelCost(fuels);
      setMonthlyFuelData(data);
    }
  }, [fuels]);

  useEffect(() => {
    if (expenses.length > 0) {
      const data = calculateExpenseBreakdown(expenses);
      setExpenseBreakdown(data);
    }
  }, [expenses]);

  const loadData = async () => {
    await Promise.all([
      loadFuels(selectedBike.id),
      loadServices(selectedBike.id),
      loadRides(selectedBike.id),
      loadExpenses(selectedBike.id)
    ]);
  };

  const totalFuelCost = fuels.reduce((sum, fuel) => sum + (fuel.cost || 0), 0);
  const totalServiceCost = services.reduce((sum, service) => sum + (service.cost || 0), 0);
  const totalExpenseCost = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
  const totalRides = rides.length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        {isAnonymous && (
          <Text style={styles.anonymousText}>Anonymous Mode (No Cloud Sync)</Text>
        )}
      </View>

      <View style={styles.bikeSelector}>
        <Text style={styles.sectionTitle}>Selected Bike</Text>
        <TouchableOpacity 
          style={styles.bikeCard}
          onPress={() => navigation.navigate('Bikes')}
        >
          <Text style={styles.bikeName}>
            {selectedBike ? selectedBike.name : 'No bike selected'}
          </Text>
          {selectedBike && (
            <Text style={styles.bikeOdometer}>
              Odometer: {selectedBike.currentOdometer} km
            </Text>
          )}
          <Text style={styles.changeText}>Tap to change</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalRides}</Text>
          <Text style={styles.statLabel}>Rides</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalFuelCost.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Fuel Cost</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalServiceCost.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Service Cost</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>${totalExpenseCost.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Other Expenses</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddFuel')}
          >
            <Text style={styles.actionIcon}>⛽</Text>
            <Text style={styles.actionText}>Add Fuel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddService')}
          >
            <Text style={styles.actionIcon}>🔧</Text>
            <Text style={styles.actionText}>Add Service</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('RideRecord')}
          >
            <Text style={styles.actionIcon}>🚴</Text>
            <Text style={styles.actionText}>Start Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddExpense')}
          >
            <Text style={styles.actionIcon}>💰</Text>
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </View>

      {monthlyFuelData.length > 0 && (
        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Monthly Fuel Cost</Text>
          <VictoryChart theme={VictoryTheme.material} height={200}>
            <VictoryBar
              data={monthlyFuelData.slice(-6)}
              x="month"
              y="cost"
              style={{ data: { fill: "#4285F4" } }}
            />
          </VictoryChart>
        </View>
      )}

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('FuelList')}
        >
          <Text style={styles.menuText}>Fuel Records</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('ServiceList')}
        >
          <Text style={styles.menuText}>Service Records</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('RideHistory')}
        >
          <Text style={styles.menuText}>Ride History</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('ExpenseList')}
        >
          <Text style={styles.menuText}>Expenses</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.menuText}>Settings</Text>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  anonymousText: {
    fontSize: 12,
    color: '#ff6b6b',
    marginTop: 5,
  },
  bikeSelector: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bikeCard: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bikeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bikeOdometer: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  changeText: {
    fontSize: 12,
    color: '#4285F4',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    margin: '1%',
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  quickActions: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  chartContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  menuContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 20,
  },
  menuItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DashboardScreen;
