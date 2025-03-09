import { View, FlatList, StyleSheet } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Expense } from '../../types/database';

interface ExpenseListProps {
  expenses: Expense[];
  onSelect?: (expense: Expense) => void;
  onEdit?: (expense: Expense) => void;
  onDelete?: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onSelect, onEdit, onDelete }: ExpenseListProps) {
  const theme = useTheme();

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const renderItem = ({ item: expense }: { item: Expense }) => (
    <List.Item
      title={expense.description || 'No description'}
      description={formatDate(expense.date)}
      left={props => (
        <Icon
          name={'cash'}
          size={24}
          color={theme.colors.primary}
          {...props}
        />
      )}
      right={props => (
        <View style={styles.rightContent}>
          <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
            {formatAmount(expense.amount)}
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
      onPress={() => onSelect?.(expense)}
    />
  );

  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}

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