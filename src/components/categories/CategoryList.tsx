import { View, FlatList, StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Category } from '../../types/database';

interface CategoryListProps {
  categories: Category[];
  onSelect?: (category: Category) => void;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
  selectedCategory?: Category | null;
}

export function CategoryList({
  categories,
  onSelect,
  onEdit,
  onDelete,
  selectedCategory,
}: CategoryListProps) {
  const theme = useTheme();

  const renderItem = ({ item: category }: { item: Category }) => (
    <List.Item
      title={category.name}
      left={(props) => <Icon name={"tag"} size={24} color={category.color} {...props} />}
      right={(props) =>
        onEdit && onDelete ? (
          <View style={styles.actions}>
            <Icon
              name="pencil"
              size={24}
              color={theme.colors.primary}
              onPress={() => onEdit(category)}
              style={styles.actionIcon}
            />
            <Icon
              name="delete"
              size={24}
              color={theme.colors.error}
              onPress={() => onDelete(category)}
            />
          </View>
        ) : null
      }
      onPress={() => onSelect?.(category)}
      style={[styles.listItem, selectedCategory?.id === category.id && styles.selectedItem]}
    />
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  listItem: {
    borderRadius: 4,
  },
  selectedItem: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginRight: 16,
  },
});
