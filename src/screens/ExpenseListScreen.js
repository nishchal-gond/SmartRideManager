import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useBike } from '../context/BikeContext';
import { useData } from '../context/DataContext';
import { exportExpensesToCSV } from '../utils/exportUtils';
import { format } from 'date-fns';

const ExpenseListScreen = ({ navigation }) => {
  const { selectedBike } = useBike();
  const { expenses, loadExpenses } = useData();

  useEffect(() => {
    if (selectedBike) {
      loadExpenses(selectedBike.id);
    }
  }, [selectedBike]);

  const handleExport = async () => {
    const result = await exportExpensesToCSV(expenses);
    if (result.success) {
      alert('Expenses exported successfully');
    } else {
      alert('Export failed: ' + result.error);
    }
  };

  const renderExpense = ({ item }) => (
    <View style={styles.expenseCard}>
      <View style={styles.expenseHeader}>
        <Text style={styles.expenseCategory}>{item.category || 'Other'}</Text>
        <Text style={styles.expenseAmount}>${item.amount?.toFixed(2)}</Text>
      </View>
      <Text style={styles.expenseDate}>
        {item.date ? format(new Date(item.date.seconds * 1000), 'MMM dd, yyyy') : 'N/A'}
      </Text>
      {item.description && (
        <Text style={styles.expenseDescription}>{item.description}</Text>
      )}
      {item.receiptUrl && (
        <Text style={styles.receiptText}>📎 Receipt attached</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpense}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No expenses yet</Text>
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.exportButton]}
          onPress={handleExport}
          disabled={expenses.length === 0}
        >
          <Text style={styles.buttonText}>Export CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate('AddExpense')}
        >
          <Text style={styles.buttonText}>+ Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  expenseCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  expenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  expenseDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  expenseDescription: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    fontStyle: 'italic',
  },
  receiptText: {
    fontSize: 14,
    color: '#34A853',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4285F4',
  },
  exportButton: {
    backgroundColor: '#34A853',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseListScreen;
