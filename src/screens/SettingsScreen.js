import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useUnits } from '../context/UnitContext';

const SettingsScreen = () => {
  const { user, isAnonymous, logout, loginWithGoogle } = useAuth();
  const {
    distanceUnit,
    volumeUnit,
    currency,
    updateDistanceUnit,
    updateVolumeUnit,
    updateCurrency
  } = useUnits();

  const [showUnitPicker, setShowUnitPicker] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Error', result.error);
            }
          }
        }
      ]
    );
  };

  const handleUpgradeAccount = async () => {
    Alert.alert(
      'Upgrade Account',
      'Link your anonymous account with Google to enable cloud sync?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Link with Google',
          onPress: async () => {
            const result = await loginWithGoogle();
            if (result.success) {
              Alert.alert('Success', 'Account upgraded successfully');
            } else {
              Alert.alert('Error', result.error);
            }
          }
        }
      ]
    );
  };

  const handleDistanceUnitChange = (unit) => {
    updateDistanceUnit(unit);
  };

  const handleVolumeUnitChange = (unit) => {
    updateVolumeUnit(unit);
  };

  const handleCurrencyChange = (newCurrency) => {
    updateCurrency(newCurrency);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>
            {isAnonymous ? 'Anonymous (No Cloud Sync)' : 'Signed In'}
          </Text>
          {user && user.email && (
            <>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </>
          )}
        </View>
      </View>

      {isAnonymous && (
        <View style={styles.section}>
          <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgradeAccount}>
            <Text style={styles.upgradeButtonText}>Upgrade to Cloud Account</Text>
            <Text style={styles.upgradeButtonSubtext}>Enable cloud sync and backup</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Sync Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Export All Data</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        {/* Distance Unit Selection */}
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceHeader}>
            <Text style={styles.preferenceLabel}>Distance Unit</Text>
            <Text style={styles.preferenceValue}>{distanceUnit === 'km' ? 'Kilometers (km)' : 'Miles (mi)'}</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.unitButton, distanceUnit === 'km' && styles.unitButtonActive]}
              onPress={() => handleDistanceUnitChange('km')}
            >
              <Text style={[styles.unitButtonText, distanceUnit === 'km' && styles.unitButtonTextActive]}>
                Kilometers (km)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.unitButton, distanceUnit === 'miles' && styles.unitButtonActive]}
              onPress={() => handleDistanceUnitChange('miles')}
            >
              <Text style={[styles.unitButtonText, distanceUnit === 'miles' && styles.unitButtonTextActive]}>
                Miles (mi)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Volume Unit Selection */}
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceHeader}>
            <Text style={styles.preferenceLabel}>Volume Unit</Text>
            <Text style={styles.preferenceValue}>{volumeUnit === 'liters' ? 'Liters (L)' : 'Gallons (gal)'}</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.unitButton, volumeUnit === 'liters' && styles.unitButtonActive]}
              onPress={() => handleVolumeUnitChange('liters')}
            >
              <Text style={[styles.unitButtonText, volumeUnit === 'liters' && styles.unitButtonTextActive]}>
                Liters (L)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.unitButton, volumeUnit === 'gallons' && styles.unitButtonActive]}
              onPress={() => handleVolumeUnitChange('gallons')}
            >
              <Text style={[styles.unitButtonText, volumeUnit === 'gallons' && styles.unitButtonTextActive]}>
                Gallons (gal)
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Currency Selection */}
        <View style={styles.preferenceCard}>
          <View style={styles.preferenceHeader}>
            <Text style={styles.preferenceLabel}>Currency</Text>
            <Text style={styles.preferenceValue}>{currency}</Text>
          </View>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.currencyButton, currency === '$' && styles.unitButtonActive]}
              onPress={() => handleCurrencyChange('$')}
            >
              <Text style={[styles.unitButtonText, currency === '$' && styles.unitButtonTextActive]}>$ USD</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.currencyButton, currency === '€' && styles.unitButtonActive]}
              onPress={() => handleCurrencyChange('€')}
            >
              <Text style={[styles.unitButtonText, currency === '€' && styles.unitButtonTextActive]}>€ EUR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.currencyButton, currency === '₹' && styles.unitButtonActive]}
              onPress={() => handleCurrencyChange('₹')}
            >
              <Text style={[styles.unitButtonText, currency === '₹' && styles.unitButtonTextActive]}>₹ INR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.currencyButton, currency === '£' && styles.unitButtonActive]}
              onPress={() => handleCurrencyChange('£')}
            >
              <Text style={[styles.unitButtonText, currency === '£' && styles.unitButtonTextActive]}>£ GBP</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Version</Text>
          <Text style={styles.value}>1.0.0</Text>
          <Text style={styles.label}>Developer</Text>
          <Text style={styles.value}>SmartRide Manager</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginTop: 5,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  preferenceCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  preferenceHeader: {
    marginBottom: 10,
  },
  preferenceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  preferenceValue: {
    fontSize: 14,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  unitButton: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  unitButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  unitButtonTextActive: {
    color: '#fff',
  },
  currencyButton: {
    minWidth: '22%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
  },
  upgradeButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  upgradeButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#EA4335',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
