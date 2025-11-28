import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnitContext = createContext();

export const useUnits = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnits must be used within a UnitProvider');
  }
  return context;
};

// Unit conversion constants
const CONVERSIONS = {
  KM_TO_MILES: 0.621371,
  MILES_TO_KM: 1.60934,
  LITERS_TO_GALLONS: 0.264172,
  GALLONS_TO_LITERS: 3.78541,
};

export const UnitProvider = ({ children }) => {
  const [distanceUnit, setDistanceUnit] = useState('km'); // 'km' or 'miles'
  const [volumeUnit, setVolumeUnit] = useState('liters'); // 'liters' or 'gallons'
  const [currency, setCurrency] = useState('$'); // '$', '€', '₹', etc.

  // Load preferences from storage
  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const distanceUnitValue = await AsyncStorage.getItem('distanceUnit');
      const volumeUnitValue = await AsyncStorage.getItem('volumeUnit');
      const currencyValue = await AsyncStorage.getItem('currency');

      if (distanceUnitValue) setDistanceUnit(distanceUnitValue);
      if (volumeUnitValue) setVolumeUnit(volumeUnitValue);
      if (currencyValue) setCurrency(currencyValue);
    } catch (error) {
      console.error('Error loading unit preferences:', error);
    }
  };

  const updateDistanceUnit = async (unit) => {
    try {
      await AsyncStorage.setItem('distanceUnit', unit);
      setDistanceUnit(unit);
    } catch (error) {
      console.error('Error saving distance unit:', error);
    }
  };

  const updateVolumeUnit = async (unit) => {
    try {
      await AsyncStorage.setItem('volumeUnit', unit);
      setVolumeUnit(unit);
    } catch (error) {
      console.error('Error saving volume unit:', error);
    }
  };

  const updateCurrency = async (newCurrency) => {
    try {
      await AsyncStorage.setItem('currency', newCurrency);
      setCurrency(newCurrency);
    } catch (error) {
      console.error('Error saving currency:', error);
    }
  };

  // Convert distance from km (stored value) to user's preference
  const formatDistance = (valueInKm, precision = 2) => {
    if (valueInKm === null || valueInKm === undefined) return 'N/A';
    
    if (distanceUnit === 'miles') {
      const miles = valueInKm * CONVERSIONS.KM_TO_MILES;
      return `${miles.toFixed(precision)} mi`;
    }
    return `${Number(valueInKm).toFixed(precision)} km`;
  };

  // Convert volume from liters (stored value) to user's preference
  const formatVolume = (valueInLiters, precision = 2) => {
    if (valueInLiters === null || valueInLiters === undefined) return 'N/A';
    
    if (volumeUnit === 'gallons') {
      const gallons = valueInLiters * CONVERSIONS.LITERS_TO_GALLONS;
      return `${gallons.toFixed(precision)} gal`;
    }
    return `${Number(valueInLiters).toFixed(precision)} L`;
  };

  // Format fuel efficiency (mileage)
  const formatMileage = (kmPerLiter, precision = 2) => {
    if (kmPerLiter === null || kmPerLiter === undefined) return 'N/A';
    
    if (distanceUnit === 'miles' && volumeUnit === 'gallons') {
      // Convert km/L to MPG
      const mpg = kmPerLiter * CONVERSIONS.KM_TO_MILES / CONVERSIONS.LITERS_TO_GALLONS;
      return `${mpg.toFixed(precision)} MPG`;
    } else if (distanceUnit === 'miles' && volumeUnit === 'liters') {
      // Convert km/L to mi/L
      const miPerL = kmPerLiter * CONVERSIONS.KM_TO_MILES;
      return `${miPerL.toFixed(precision)} mi/L`;
    } else if (distanceUnit === 'km' && volumeUnit === 'gallons') {
      // Convert km/L to km/gal
      const kmPerGal = kmPerLiter / CONVERSIONS.LITERS_TO_GALLONS;
      return `${kmPerGal.toFixed(precision)} km/gal`;
    }
    // Default: km/L
    return `${Number(kmPerLiter).toFixed(precision)} km/L`;
  };

  // Format currency
  const formatCurrency = (value, precision = 2) => {
    if (value === null || value === undefined) return 'N/A';
    return `${currency}${Number(value).toFixed(precision)}`;
  };

  // Convert user input distance to km for storage
  const convertDistanceToKm = (value) => {
    if (distanceUnit === 'miles') {
      return value * CONVERSIONS.MILES_TO_KM;
    }
    return value;
  };

  // Convert user input volume to liters for storage
  const convertVolumeToLiters = (value) => {
    if (volumeUnit === 'gallons') {
      return value * CONVERSIONS.GALLONS_TO_LITERS;
    }
    return value;
  };

  const value = {
    // Current unit settings
    distanceUnit,
    volumeUnit,
    currency,
    
    // Update functions
    updateDistanceUnit,
    updateVolumeUnit,
    updateCurrency,
    
    // Formatting functions (for display)
    formatDistance,
    formatVolume,
    formatMileage,
    formatCurrency,
    
    // Conversion functions (for storage)
    convertDistanceToKm,
    convertVolumeToLiters,
    
    // Helper to get unit labels for inputs
    getDistanceUnitLabel: () => (distanceUnit === 'miles' ? 'mi' : 'km'),
    getVolumeUnitLabel: () => (volumeUnit === 'gallons' ? 'gal' : 'L'),
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
};
