import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
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
  return (
    <List.Item
      title={expense.description || 'No description'}
      description={formatDate(expense.date)}
      left={(props) => <Icon name={'cash'} size={24} color={theme.colors.primary} {...props} />}
      right={(props) => (
        <View style={styles.rightContent}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {formatCurrency(expense.amount)}
          </Text>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {`${expense.category_name} - ${expense.description}`}
          </Text>
          {onEdit && onDelete && (
            <View style={styles.actions}>
              <Icon
                name="pencil"
                size={20}
                color={theme.colors.primary}
                onPress={() => onEdit(expense)}
                style={styles.actionIcon}
              />
              <Icon
                name="delete"
                size={20}
                color={theme.colors.error}
                onPress={() => onDelete(expense)}
              />
            </View>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  rightContent: {
    alignItems: 'flex-end',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 4,
  },
  actionIcon: {
    marginRight: 12,
  },
});
