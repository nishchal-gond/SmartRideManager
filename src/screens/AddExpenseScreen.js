import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { uploadReceipt } from '../services/storageService';

const CATEGORIES = ['Fuel', 'Service', 'Insurance', 'Parts', 'Accessories', 'Parking', 'Tolls', 'Other'];

const AddExpenseScreen = ({ navigation }) => {
  const { user } = useAuth();
  const { selectedBike } = useBike();
  const { addExpenseRecord } = useData();
  const [category, setCategory] = useState('Other');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [receiptUri, setReceiptUri] = useState(null);

  const handlePickReceipt = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setReceiptUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick receipt');
    }
  };

  const handleSave = async () => {
    if (!category || !amount) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    let receiptUrl = null;
    if (receiptUri && user && selectedBike) {
      const uploadResult = await uploadReceipt(
        user.uid,
        selectedBike.id,
        receiptUri,
        `receipt_${Date.now()}.jpg`
      );
      if (uploadResult.success) {
        receiptUrl = uploadResult.url;
      }
    }

    const expenseData = {
      category,
      description,
      amount: parseFloat(amount),
      receiptUrl,
      date: new Date(),
    };

    const result = await addExpenseRecord(expenseData);
    if (result.success) {
      Alert.alert('Success', 'Expense added successfully');
      navigation.goBack();
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Category *</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                category === cat && styles.categoryButtonSelected
              ]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[
                styles.categoryButtonText,
                category === cat && styles.categoryButtonTextSelected
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="What was this expense for?"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.receiptButton} onPress={handlePickReceipt}>
          <Text style={styles.receiptButtonText}>
            {receiptUri ? '✓ Receipt attached' : '📎 Attach Receipt (Optional)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Expense</Text>
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
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonSelected: {
    backgroundColor: '#4285F4',
    borderColor: '#4285F4',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  receiptButton: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#34A853',
  },
  receiptButtonText: {
    color: '#34A853',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddExpenseScreen;
