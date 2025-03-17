import { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { FAB, Portal, Modal, useTheme, Snackbar, Text } from 'react-native-paper';
import { ExpenseList } from '../../src/components/expenses/ExpenseList';
import { Expense } from '../../src/types/expense';
import { expenseService } from '../../src/services/api/expenses';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { ExpenseForm } from '../../src/components/expenses/ExpenseForm';
import { categoriesService } from '../../src/services/api/categories';

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const handleCreate = async (values: Partial<Expense>) => {
    try {
      setError(null);
      const payload = await expenseService.post({
        amount: values.amount,
        description: values.description,
        date: values.date,
        category_name: values.category_name,
      });
      if (payload) {
        setExpenses([...expenses, payload]);
        setModalVisible(false);
        fetchData();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating expense:', err);
    }
  };

  const handleUpdate = async (values: Partial<Expense>) => {
    if (!editingExpense) return;
    try {
      setError(null);
      const payload = await expenseService.put({
        id: editingExpense.id,
        amount: values.amount,
        description: values.description,
        date: values.date,
        category_name: values.category_name,
      });
      if (payload) {
        setExpenses(expenses.map((e) => (e.id === editingExpense.id ? payload : e)));
        setModalVisible(false);
        setEditingExpense(null);
        fetchData();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating expense:', err);
    }
  };

  const handleDelete = async (expense: Expense) => {
    try {
      setError(null);
      const result = await expenseService.delete(expense.id);
      if (result) {
        setExpenses(expenses.filter((e) => e.id !== expense.id));
        fetchData();
      }
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
      const categories = await categoriesService.get();
      const response = await expenseService.get();
      setExpenses(response.expenses);
      setCategories(categories);
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
        <View style={styles.container}>
          <Text style={styles.dateRange}>
            {dateStart} - {dateEnd}
          </Text>
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
            refreshing={loading}
            onRefresh={fetchData}
          />
        </View>

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => {
              setModalVisible(false);
              setEditingExpense(null);
            }}
            contentContainerStyle={styles.modal}
          >
            <ExpenseForm
              initialValues={editingExpense || undefined}
              onSubmit={editingExpense ? handleUpdate : handleCreate}
              categories={categories}
              onCancel={() => {
                setModalVisible(false);
                setEditingExpense(null);
              }}
            />
          </Modal>
        </Portal>

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
  dateRange: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
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
