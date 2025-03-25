import { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  FAB,
  Portal,
  Modal,
  useTheme,
  Card,
  Text,
  Divider,
  Badge,
  Snackbar,
} from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { CategoryForm } from '../../src/components/categories/CategoryForm';
import { categoriesService } from '../../src/services/api/categories';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesService.get();
      setCategories(data);
    } catch (error) {
      setError('Failed to load categories');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
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
      setError('Error creating category');
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
      setError('Error updating category');
      console.error('Error updating category:', error);
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
      setError('Error deleting category');
      console.error('Error deleting category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: string) => {
    setEditingCategory(category);
    setModalVisible(true);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCategories();
  }, []);

  const dismissError = () => {
    setError(null);
  };

  const renderItem = ({ item: category }: { item: string }) => {
    // Generate initials for the category
    const initials = category
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.leftContent}>
              <Badge
                size={40}
                style={[styles.avatar, { backgroundColor: theme.colors.primaryContainer }]}
              >
                {initials}
              </Badge>
              <Text variant="titleMedium" style={styles.categoryName}>
                {category}
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleEdit(category)}>
              <Icon name="pencil" size={16} color={theme.colors.primary} />
              <Text variant="labelMedium" style={{ color: theme.colors.primary, marginLeft: 4 }}>
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(category)}>
              <Icon name="delete" size={16} color={theme.colors.error} />
              <Text variant="labelMedium" style={{ color: theme.colors.error, marginLeft: 4 }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="tag-remove" size={64} color={theme.colors.outlineVariant} />
      <Text style={styles.emptyText}>No categories found</Text>
      <Text style={styles.emptySubtext}>Pull down to refresh or add a new category</Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Card style={styles.summaryCard}>
            <Card.Content>
              <View style={styles.summaryContent}>
                <Text variant="titleLarge">Categories</Text>
                <Text variant="bodyLarge">{categories.length} total</Text>
              </View>
            </Card.Content>
          </Card>

          <View style={styles.listContainer}>
            {categories.length === 0 && !loading ? (
              <EmptyState />
            ) : (
              <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                contentContainerStyle={styles.listContent}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
              />
            )}
          </View>
        </View>

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

        <FAB
          icon="plus"
          style={[styles.fab, { backgroundColor: theme.colors.primary }]}
          onPress={() => setModalVisible(true)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryCard: {
    margin: 16,
    marginBottom: 0,
    elevation: 2,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    padding: 16,
  },
  card: {
    elevation: 2,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 12,
  },
  categoryName: {
    fontWeight: '500',
  },
  divider: {
    marginVertical: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySubtext: {
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.6,
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
