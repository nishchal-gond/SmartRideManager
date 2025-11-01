import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { getBikes, createBike, updateBike, deleteBike } from '../services/firestoreService';

const BikeContext = createContext();

export const useBike = () => {
  const context = useContext(BikeContext);
  if (!context) {
    throw new Error('useBike must be used within BikeProvider');
  }
  return context;
};

export const BikeProvider = ({ children }) => {
  const { user } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [selectedBike, setSelectedBike] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.isAnonymous) {
      loadBikes();
    }
  }, [user]);

  const loadBikes = async (useCache = true) => {
    if (!user) return;
    
    setLoading(true);
    const result = await getBikes(user.uid, useCache);
    if (result.success) {
      setBikes(result.data);
      if (result.data.length > 0 && !selectedBike) {
        setSelectedBike(result.data[0]);
      }
    }
    setLoading(false);
  };

  const addBike = async (bikeData) => {
    if (!user) return { success: false, error: 'No user logged in' };
    
    const result = await createBike(user.uid, bikeData);
    if (result.success) {
      await loadBikes(false);
    }
    return result;
  };

  const editBike = async (bikeId, bikeData) => {
    const result = await updateBike(bikeId, bikeData);
    if (result.success) {
      await loadBikes(false);
    }
    return result;
  };

  const removeBike = async (bikeId) => {
    const result = await deleteBike(bikeId);
    if (result.success) {
      await loadBikes(false);
      if (selectedBike && selectedBike.id === bikeId) {
        setSelectedBike(bikes[0] || null);
      }
    }
    return result;
  };

  const selectBike = (bike) => {
    setSelectedBike(bike);
  };

  const value = {
    bikes,
    selectedBike,
    loading,
    loadBikes,
    addBike,
    editBike,
    removeBike,
    selectBike
  };

  return <BikeContext.Provider value={value}>{children}</BikeContext.Provider>;
};
