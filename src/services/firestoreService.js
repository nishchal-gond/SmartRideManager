import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLLECTIONS = {
  BIKES: 'bikes',
  FUELS: 'fuels',
  SERVICES: 'services',
  RIDES: 'rides',
  EXPENSES: 'expenses'
};

export const createBike = async (userId, bikeData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.BIKES), {
      ...bikeData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    await cacheData(COLLECTIONS.BIKES, docRef.id, { ...bikeData, id: docRef.id });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating bike:', error);
    return { success: false, error: error.message };
  }
};

export const updateBike = async (bikeId, bikeData) => {
  try {
    const bikeRef = doc(db, COLLECTIONS.BIKES, bikeId);
    await updateDoc(bikeRef, {
      ...bikeData,
      updatedAt: serverTimestamp()
    });
    await cacheData(COLLECTIONS.BIKES, bikeId, { ...bikeData, id: bikeId });
    return { success: true };
  } catch (error) {
    console.error('Error updating bike:', error);
    return { success: false, error: error.message };
  }
};

export const deleteBike = async (bikeId) => {
  try {
    await deleteDoc(doc(db, COLLECTIONS.BIKES, bikeId));
    await removeCachedData(COLLECTIONS.BIKES, bikeId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting bike:', error);
    return { success: false, error: error.message };
  }
};

export const getBikes = async (userId, useCache = true) => {
  try {
    if (useCache) {
      const cached = await getCachedData(COLLECTIONS.BIKES);
      if (cached) return { success: true, data: cached };
    }

    const q = query(
      collection(db, COLLECTIONS.BIKES),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const bikes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    await cacheData(COLLECTIONS.BIKES, 'all', bikes);
    return { success: true, data: bikes };
  } catch (error) {
    console.error('Error getting bikes:', error);
    const cached = await getCachedData(COLLECTIONS.BIKES);
    return { success: !!cached, data: cached || [], error: error.message };
  }
};

export const addFuel = async (userId, bikeId, fuelData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.FUELS), {
      ...fuelData,
      userId,
      bikeId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding fuel:', error);
    return { success: false, error: error.message };
  }
};

export const getFuels = async (userId, bikeId, useCache = true) => {
  try {
    if (useCache) {
      const cached = await getCachedData(`${COLLECTIONS.FUELS}_${bikeId}`);
      if (cached) return { success: true, data: cached };
    }

    const q = query(
      collection(db, COLLECTIONS.FUELS),
      where('userId', '==', userId),
      where('bikeId', '==', bikeId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const fuels = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    await cacheData(`${COLLECTIONS.FUELS}_${bikeId}`, 'all', fuels);
    return { success: true, data: fuels };
  } catch (error) {
    console.error('Error getting fuels:', error);
    const cached = await getCachedData(`${COLLECTIONS.FUELS}_${bikeId}`);
    return { success: !!cached, data: cached || [], error: error.message };
  }
};

export const addService = async (userId, bikeId, serviceData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.SERVICES), {
      ...serviceData,
      userId,
      bikeId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding service:', error);
    return { success: false, error: error.message };
  }
};

export const getServices = async (userId, bikeId, useCache = true) => {
  try {
    if (useCache) {
      const cached = await getCachedData(`${COLLECTIONS.SERVICES}_${bikeId}`);
      if (cached) return { success: true, data: cached };
    }

    const q = query(
      collection(db, COLLECTIONS.SERVICES),
      where('userId', '==', userId),
      where('bikeId', '==', bikeId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const services = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    await cacheData(`${COLLECTIONS.SERVICES}_${bikeId}`, 'all', services);
    return { success: true, data: services };
  } catch (error) {
    console.error('Error getting services:', error);
    const cached = await getCachedData(`${COLLECTIONS.SERVICES}_${bikeId}`);
    return { success: !!cached, data: cached || [], error: error.message };
  }
};

export const addRide = async (userId, bikeId, rideData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.RIDES), {
      ...rideData,
      userId,
      bikeId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding ride:', error);
    return { success: false, error: error.message };
  }
};

export const getRides = async (userId, bikeId, useCache = true) => {
  try {
    if (useCache) {
      const cached = await getCachedData(`${COLLECTIONS.RIDES}_${bikeId}`);
      if (cached) return { success: true, data: cached };
    }

    const q = query(
      collection(db, COLLECTIONS.RIDES),
      where('userId', '==', userId),
      where('bikeId', '==', bikeId),
      orderBy('startTime', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const rides = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    await cacheData(`${COLLECTIONS.RIDES}_${bikeId}`, 'all', rides);
    return { success: true, data: rides };
  } catch (error) {
    console.error('Error getting rides:', error);
    const cached = await getCachedData(`${COLLECTIONS.RIDES}_${bikeId}`);
    return { success: !!cached, data: cached || [], error: error.message };
  }
};

export const addExpense = async (userId, bikeId, expenseData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.EXPENSES), {
      ...expenseData,
      userId,
      bikeId,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding expense:', error);
    return { success: false, error: error.message };
  }
};

export const getExpenses = async (userId, bikeId, useCache = true) => {
  try {
    if (useCache) {
      const cached = await getCachedData(`${COLLECTIONS.EXPENSES}_${bikeId}`);
      if (cached) return { success: true, data: cached };
    }

    const q = query(
      collection(db, COLLECTIONS.EXPENSES),
      where('userId', '==', userId),
      where('bikeId', '==', bikeId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const expenses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    await cacheData(`${COLLECTIONS.EXPENSES}_${bikeId}`, 'all', expenses);
    return { success: true, data: expenses };
  } catch (error) {
    console.error('Error getting expenses:', error);
    const cached = await getCachedData(`${COLLECTIONS.EXPENSES}_${bikeId}`);
    return { success: !!cached, data: cached || [], error: error.message };
  }
};

const cacheData = async (collection, key, data) => {
  try {
    await AsyncStorage.setItem(`${collection}_${key}`, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching data:', error);
  }
};

const getCachedData = async (collection) => {
  try {
    const data = await AsyncStorage.getItem(`${collection}_all`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

const removeCachedData = async (collection, key) => {
  try {
    await AsyncStorage.removeItem(`${collection}_${key}`);
  } catch (error) {
    console.error('Error removing cached data:', error);
  }
};

export { COLLECTIONS };
