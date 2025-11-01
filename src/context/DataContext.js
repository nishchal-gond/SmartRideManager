import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useBike } from './BikeContext';
import {
  addFuel,
  getFuels,
  addService,
  getServices,
  addRide,
  getRides,
  addExpense,
  getExpenses
} from '../services/firestoreService';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const { selectedBike } = useBike();
  const [fuels, setFuels] = useState([]);
  const [services, setServices] = useState([]);
  const [rides, setRides] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadFuels = async (bikeId, useCache = true) => {
    if (!user || !bikeId) return;
    
    setLoading(true);
    const result = await getFuels(user.uid, bikeId, useCache);
    if (result.success) {
      setFuels(result.data);
    }
    setLoading(false);
    return result;
  };

  const addFuelRecord = async (fuelData) => {
    if (!user || !selectedBike) return { success: false, error: 'No bike selected' };
    
    const result = await addFuel(user.uid, selectedBike.id, fuelData);
    if (result.success) {
      await loadFuels(selectedBike.id, false);
    }
    return result;
  };

  const loadServices = async (bikeId, useCache = true) => {
    if (!user || !bikeId) return;
    
    setLoading(true);
    const result = await getServices(user.uid, bikeId, useCache);
    if (result.success) {
      setServices(result.data);
    }
    setLoading(false);
    return result;
  };

  const addServiceRecord = async (serviceData) => {
    if (!user || !selectedBike) return { success: false, error: 'No bike selected' };
    
    const result = await addService(user.uid, selectedBike.id, serviceData);
    if (result.success) {
      await loadServices(selectedBike.id, false);
    }
    return result;
  };

  const loadRides = async (bikeId, useCache = true) => {
    if (!user || !bikeId) return;
    
    setLoading(true);
    const result = await getRides(user.uid, bikeId, useCache);
    if (result.success) {
      setRides(result.data);
    }
    setLoading(false);
    return result;
  };

  const addRideRecord = async (rideData) => {
    if (!user || !selectedBike) return { success: false, error: 'No bike selected' };
    
    const result = await addRide(user.uid, selectedBike.id, rideData);
    if (result.success) {
      await loadRides(selectedBike.id, false);
    }
    return result;
  };

  const loadExpenses = async (bikeId, useCache = true) => {
    if (!user || !bikeId) return;
    
    setLoading(true);
    const result = await getExpenses(user.uid, bikeId, useCache);
    if (result.success) {
      setExpenses(result.data);
    }
    setLoading(false);
    return result;
  };

  const addExpenseRecord = async (expenseData) => {
    if (!user || !selectedBike) return { success: false, error: 'No bike selected' };
    
    const result = await addExpense(user.uid, selectedBike.id, expenseData);
    if (result.success) {
      await loadExpenses(selectedBike.id, false);
    }
    return result;
  };

  const value = {
    fuels,
    services,
    rides,
    expenses,
    loading,
    loadFuels,
    addFuelRecord,
    loadServices,
    addServiceRecord,
    loadRides,
    addRideRecord,
    loadExpenses,
    addExpenseRecord
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
