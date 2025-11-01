export const calculateMileage = (currentOdometer, previousFillOdometer, litersFilled) => {
  if (!previousFillOdometer || litersFilled <= 0) {
    return null;
  }
  
  const distance = currentOdometer - previousFillOdometer;
  if (distance <= 0) {
    return null;
  }
  
  return (distance / litersFilled).toFixed(2);
};

export const getPreviousFillOdometer = (fuels, currentIndex) => {
  if (currentIndex === 0 || !fuels || fuels.length === 0) {
    return null;
  }
  
  const previousFuel = fuels[currentIndex - 1];
  return previousFuel ? previousFuel.odometer : null;
};

export const getLastServiceOdometer = (services) => {
  if (!services || services.length === 0) {
    return null;
  }
  
  return services[0].odometer;
};

export const calculateDistance = (coordinates) => {
  if (!coordinates || coordinates.length < 2) {
    return 0;
  }
  
  let totalDistance = 0;
  for (let i = 1; i < coordinates.length; i++) {
    const lat1 = coordinates[i - 1].latitude;
    const lon1 = coordinates[i - 1].longitude;
    const lat2 = coordinates[i].latitude;
    const lon2 = coordinates[i].longitude;
    
    totalDistance += haversineDistance(lat1, lon1, lat2, lon2);
  }
  
  return totalDistance;
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

export const calculateSpeed = (distance, duration) => {
  if (duration <= 0) return 0;
  return (distance / (duration / 3600000)).toFixed(2);
};

export const formatDuration = (milliseconds) => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  
  return `${hours}h ${minutes}m ${seconds}s`;
};

export const calculateMonthlyFuelCost = (fuels) => {
  const monthlyData = {};
  
  fuels.forEach(fuel => {
    const date = new Date(fuel.date.seconds * 1000);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = 0;
    }
    
    monthlyData[monthKey] += fuel.cost || 0;
  });
  
  return Object.keys(monthlyData).map(month => ({
    month,
    cost: monthlyData[month]
  }));
};

export const calculateExpenseBreakdown = (expenses) => {
  const breakdown = {};
  
  expenses.forEach(expense => {
    const category = expense.category || 'Other';
    if (!breakdown[category]) {
      breakdown[category] = 0;
    }
    breakdown[category] += expense.amount || 0;
  });
  
  return Object.keys(breakdown).map(category => ({
    category,
    amount: breakdown[category]
  }));
};
