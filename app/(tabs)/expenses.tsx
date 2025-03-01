import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal, Modal, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { ExpenseList } from '../../src/components/expenses/ExpenseList';
import { ExpenseForm } from '../../src/components/expenses/ExpenseForm';
import { expenseService } from '../../src/services/api/expenses';
import { categoryService } from '../../src/services/api/categories';
import { Expense, Category } from '../../src/types/database';

export default function ExpensesScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const theme = useTheme();

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesData, categoriesData] = await Promise.all([
        expenseService.getAll(),
        categoryService.getAll(),
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      // TODO: Show error toast
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
      await expenseService.create(values);
      setModalVisible(false);
      loadData();
    } catch (error) {
      console.error('Error creating expense:', error);
      // TODO: Show error toast
    }
  };

  const handleUpdate = async (values: Partial<Expense>) => {
    if (!editingExpense) return;
    try {
      await expenseService.update(editingExpense.id, values);
      setModalVisible(false);
      setEditingExpense(null);
      loadData();
    } catch (error) {
      console.error('Error updating expense:', error);
      // TODO: Show error toast
    }
  };

  const handleDelete = async (expense: Expense) => {
    try {
      await expenseService.delete(expense.id);
      loadData();
    } catch (error) {
      console.error('Error deleting expense:', error);
      // TODO: Show error toast
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
            categories={categories}
            onSubmit={editingExpense ? handleUpdate : handleCreate}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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