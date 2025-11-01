import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BikesScreen from '../screens/BikesScreen';
import AddBikeScreen from '../screens/AddBikeScreen';
import FuelListScreen from '../screens/FuelListScreen';
import AddFuelScreen from '../screens/AddFuelScreen';
import ServiceListScreen from '../screens/ServiceListScreen';
import AddServiceScreen from '../screens/AddServiceScreen';
import ExpenseListScreen from '../screens/ExpenseListScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import RideRecordScreen from '../screens/RideRecordScreen';
import RideHistoryScreen from '../screens/RideHistoryScreen';
import RideDetailScreen from '../screens/RideDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'SmartRide Manager' }}
          />
          <Stack.Screen 
            name="Bikes" 
            component={BikesScreen}
            options={{ title: 'My Bikes' }}
          />
          <Stack.Screen 
            name="AddBike" 
            component={AddBikeScreen}
            options={{ title: 'Add Bike' }}
          />
          <Stack.Screen 
            name="FuelList" 
            component={FuelListScreen}
            options={{ title: 'Fuel Records' }}
          />
          <Stack.Screen 
            name="AddFuel" 
            component={AddFuelScreen}
            options={{ title: 'Add Fuel' }}
          />
          <Stack.Screen 
            name="ServiceList" 
            component={ServiceListScreen}
            options={{ title: 'Service Records' }}
          />
          <Stack.Screen 
            name="AddService" 
            component={AddServiceScreen}
            options={{ title: 'Add Service' }}
          />
          <Stack.Screen 
            name="ExpenseList" 
            component={ExpenseListScreen}
            options={{ title: 'Expenses' }}
          />
          <Stack.Screen 
            name="AddExpense" 
            component={AddExpenseScreen}
            options={{ title: 'Add Expense' }}
          />
          <Stack.Screen 
            name="RideRecord" 
            component={RideRecordScreen}
            options={{ title: 'Record Ride' }}
          />
          <Stack.Screen 
            name="RideHistory" 
            component={RideHistoryScreen}
            options={{ title: 'Ride History' }}
          />
          <Stack.Screen 
            name="RideDetail" 
            component={RideDetailScreen}
            options={{ title: 'Ride Details' }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
