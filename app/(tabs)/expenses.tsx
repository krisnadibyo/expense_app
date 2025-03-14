import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal, Modal, useTheme, Snackbar, Text, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { ExpenseList } from '../../src/components/expenses/ExpenseList';
import { ExpenseForm } from '../../src/components/expenses/ExpenseForm';
import { Expense } from '../../src/types/expense';
import { Category } from '../../src/types/category';
import { expensesService } from '../../src/services/api/expenses';
import { categoriesService } from '../../src/services/api/categories';

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [expensesData, categoriesData] = await Promise.all([
        expensesService.getExpenses(),
        categoriesService.getCategories(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const handleCreate = async (values: Partial<Expense>) => {
    try {
      setError(null);
      // await expensesService.createExpense(values);
      setModalVisible(false);
      loadData();
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
      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating expense:', err);
    }
  };

  const handleDelete = async (expense: Expense) => {
    try {
      setError(null);
      // await expensesService.deleteExpense(expense.id);
      loadData();
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

  return (
    <View style={styles.container}>
      {/* {loading ? (
        <View style={styles.centerContainer}>
          <Text>Loading expenses...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={loadData} style={styles.retryButton}>
            Retry
          </Button>
        </View>
      ) : expenses.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text>No expenses found. Add your first expense!</Text>
        </View>
      ) : (
        // <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
      )} */}

      {/* <Portal>
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
            categories={categories}
            onSubmit={editingExpense ? handleUpdate : handleCreate}
            onCancel={() => {
              setModalVisible(false);
              setEditingExpense(null);
            }}
          />
        </Modal>
      </Portal> */}

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
    </View>
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
