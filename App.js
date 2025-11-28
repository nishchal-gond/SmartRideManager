import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { BikeProvider } from './src/context/BikeContext';
import { DataProvider } from './src/context/DataContext';
import { UnitProvider } from './src/context/UnitContext';
import AppNavigator from './src/navigation/AppNavigator';
import { initializeNotifications } from './src/services/notificationService';

export default function App() {
  React.useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <UnitProvider>
      <AuthProvider>
        <BikeProvider>
          <DataProvider>
            <NavigationContainer>
              <AppNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </DataProvider>
        </BikeProvider>
      </AuthProvider>
    </UnitProvider>
  );
}
