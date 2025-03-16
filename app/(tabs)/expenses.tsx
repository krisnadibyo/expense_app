import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { FAB, Portal, Modal, useTheme, Snackbar, Text, Button } from 'react-native-paper';
import { ExpenseList } from '../../src/components/expenses/ExpenseList';
import { Expense } from '../../src/types/expense';
import { expenseService } from '../../src/services/api/expenses';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );


  const handleCreate = async (values: Partial<Expense>) => {
    try {
      setError(null);
      // await expensesService.createExpense(values);
      setModalVisible(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating expense:', err);
    }
  };

  const handleUpdate = async (values: Partial<Expense>) => {
    if (!editingExpense) return;
    try {
      setError(null);
      // await expensesService.updateExpense(editingExpense.id, values);
      setModalVisible(false);
      setEditingExpense(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating expense:', err);
    }
  };

  const handleDelete = async (expense: Expense) => {
    try {
      setError(null);
      // await expensesService.deleteExpense(expense.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting expense:', err);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setModalVisible(true);
  };

  const dismissError = () => {
    setError(null);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await expenseService.get();
      setExpenses(response.expenses);
      setDateStart(response.start_date);
      setDateEnd(response.end_date);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          refreshControl={ 
            <RefreshControl refreshing={loading} onRefresh={fetchData} /> }
        >
          <Text>{dateStart} - {dateEnd}</Text>
          <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
        </ScrollView>

        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={() => setModalVisible(true)}
        />
        <Snackbar
          visible={!!error}
          onDismiss={dismissError}
          action={{
            label: 'Dismiss',
            onPress: dismissError,
          }}
        >
          {error}
        </Snackbar>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 8,
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
