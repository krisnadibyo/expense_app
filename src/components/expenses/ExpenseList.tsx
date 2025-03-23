import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme, Avatar, Divider, Badge } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Expense } from '../../types/expense';
import { formatCurrency, formatDate } from '../../utils/stringUtils';

interface ExpenseListProps {
  expenses: Expense[];
  onSelect?: (expense: Expense) => void;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ExpenseList({
  expenses,
  onEdit,
  onDelete,
  refreshing,
  onRefresh,
}: ExpenseListProps) {
  const theme = useTheme();

  if (expenses.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="cash-remove" size={64} color={theme.colors.outlineVariant} />
        <Text style={styles.emptyText}>No expenses found</Text>
        <Text style={styles.emptySubtext}>Pull down to refresh or add a new expense</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => <ExpenseItem expense={item} onEdit={onEdit} onDelete={onDelete} />}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        refreshing !== undefined && onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
    />
  );
}

const ExpenseItem = ({
  expense,
  onEdit,
  onDelete,
}: {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
}) => {
  const theme = useTheme();

  // Generate initials for the avatar from category name
  const initials = expense.category_name
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
            <Avatar.Text
              size={40}
              label={initials}
              style={[styles.avatar, { backgroundColor: theme.colors.primaryContainer }]}
              labelStyle={{ color: theme.colors.primary }}
            />
            <View style={styles.expenseInfo}>
              <Text variant="titleMedium" style={styles.description}>
                {expense.description || 'No description'}
              </Text>
              <Text variant="bodySmall" style={styles.date}>
                {formatDate(expense.date)}
              </Text>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text variant="titleMedium" style={styles.amount}>
              {formatCurrency(expense.amount)}
            </Text>
            <Badge
              style={styles.categoryBadge}
            >
              {expense.category_name}
            </Badge>
          </View>
        </View>

        {onEdit && onDelete && (
          <View>
            <Divider style={styles.divider} />
            <View style={styles.actions}>
              <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(expense)}>
                <Icon name="pencil" size={16} color={theme.colors.primary} />
                <Text variant="labelMedium" style={{ color: theme.colors.primary, marginLeft: 4 }}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(expense)}>
                <Icon name="delete" size={16} color={theme.colors.error} />
                <Text variant="labelMedium" style={{ color: theme.colors.error, marginLeft: 4 }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  listContainer: {
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
  expenseInfo: {
    flex: 1,
  },
  description: {
    fontWeight: '500',
  },
  date: {
    marginTop: 2,
    opacity: 0.7,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
  },
  categoryBadge: {
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 4,
    paddingHorizontal: 4,
    backgroundColor: '#f2e346',
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
});
