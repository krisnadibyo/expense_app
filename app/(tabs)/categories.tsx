import { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal, Modal, useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { CategoryList } from '../../src/components/categories/CategoryList';
import { CategoryForm } from '../../src/components/categories/CategoryForm';
import { categoryService } from '../../src/services/api/categories';
import { Category } from '../../src/types/database';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const theme = useTheme();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      // TODO: Show error toast
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCategories();
    }, [])
  );

  const handleCreate = async (values: Partial<Category>) => {
    try {
      await categoryService.create(values);
      setModalVisible(false);
      loadCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      // TODO: Show error toast
    }
  };

  const handleUpdate = async (values: Partial<Category>) => {
    if (!editingCategory) return;
    try {
      await categoryService.update(editingCategory.id, values);
      setModalVisible(false);
      setEditingCategory(null);
      loadCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      // TODO: Show error toast
    }
  };

  const handleDelete = async (category: Category) => {
    try {
      await categoryService.delete(category.id);
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      // TODO: Show error toast
    }
  };

  const handleEdit = (category: Category) => {
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
            initialValues={editingCategory || undefined}
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