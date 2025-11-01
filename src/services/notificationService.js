import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const initializeNotifications = async () => {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return false;
  }
  
  return true;
};

export const scheduleServiceReminder = async (bikeId, bikeName, serviceType, dueDate, dueKm) => {
  try {
    const trigger = new Date(dueDate);
    trigger.setHours(9, 0, 0, 0);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Service Reminder',
        body: `${bikeName}: ${serviceType} is due soon (${dueKm} km or ${dueDate.toLocaleDateString()})`,
        data: { bikeId, serviceType },
      },
      trigger,
    });
    
    return { success: true, notificationId };
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return { success: false, error: error.message };
  }
};

export const cancelNotification = async (notificationId) => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    return { success: true };
  } catch (error) {
    console.error('Error canceling notification:', error);
    return { success: false, error: error.message };
  }
};

export const checkServiceDue = (lastServiceOdometer, currentOdometer, serviceInterval, lastServiceDate, serviceIntervalDays) => {
  const kmDue = lastServiceOdometer + serviceInterval <= currentOdometer;
  const daysSinceService = Math.floor((new Date() - new Date(lastServiceDate)) / (1000 * 60 * 60 * 24));
  const dateDue = daysSinceService >= serviceIntervalDays;
  
  return {
    isDue: kmDue || dateDue,
    kmDue,
    dateDue,
    kmRemaining: serviceInterval - (currentOdometer - lastServiceOdometer),
    daysRemaining: serviceIntervalDays - daysSinceService
  };
};
