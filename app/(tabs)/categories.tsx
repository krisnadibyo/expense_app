import { useState, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { FAB, Portal, Modal, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { CategoryList } from '../../src/components/categories/CategoryList';
import { CategoryForm } from '../../src/components/categories/CategoryForm';
import { categoriesService } from '../../src/services/api/categories';
import { useAuth } from '../../src/contexts/AuthContext';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const theme = useTheme();
  const { token } = useAuth();
  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesService.get(token);
      setCategories(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  const handleCreate = async (newCategory: string, _oldCategory?: string) => {
    try {
      setLoading(true);
      const result = await categoriesService.post(newCategory);
      if (result) {
        setModalVisible(false);
        setEditingCategory(null);
        loadCategories();
      }
    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (newCategory: string, oldCategory: string) => {
    if (!editingCategory) return;
    try {
      setLoading(true);
      const result = await categoriesService.put(oldCategory, newCategory);
      if (result) {
        setModalVisible(false);
        setEditingCategory(null);
        loadCategories();
      }
    } catch (error) {
      console.error('Error updating category:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (value: string) => {
    try {
      setLoading(true);
      const result = await categoriesService.delete(value);
      if (result) {
        loadCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: string) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            setEditingCategory(null);
          }}
          contentContainerStyle={styles.modal}
        >
          <CategoryForm
            currentCategory={editingCategory || undefined}
            onSubmit={editingCategory ? handleUpdate : handleCreate}
            onCancel={() => {
              setModalVisible(false);
              setEditingCategory(null);
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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