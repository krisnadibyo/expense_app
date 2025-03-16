import { View, FlatList, StyleSheet } from 'react-native';
import { List, useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

interface CategoryListProps {
  categories: string[];
  onSelect?: (category: string) => void;
  onEdit?: (category: string) => void;
  onDelete?: (category: string) => void;
  selectedCategory?: string | null;
}

export function CategoryList({
  categories,
  onSelect,
  onEdit,
  onDelete,
  selectedCategory,
}: CategoryListProps) {
  const theme = useTheme();

  const renderItem = ({ item: category }: { item: string }) => (
    <List.Item
      title={category}
      left={(props) => <Icon name={"tag"} size={24} color={theme.colors.primary} {...props} />}
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
      style={[styles.listItem, selectedCategory === category && styles.selectedItem]}
    />
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item}
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
