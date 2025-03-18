import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  Text,
  Searchbar,
  Avatar,
  Card,
  Divider,
  ActivityIndicator,
  Button,
  IconButton,
} from 'react-native-paper';
import { expenseService } from '../../src/services/api/expenses';
import { ExpensesResponse, Expense } from '../../src/types/expense';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { formatDate } from '../../src/utils/dateUtils';
import { categoriesService } from '../../src/services/api/categories';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [expenseData, setExpenseData] = useState<ExpensesResponse | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('Total');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchExpenseData();
    fetchCategories();
  }, []);

  const fetchExpenseData = async () => {
    try {
      setLoading(true);
      const data = await expenseService.get('month');
      setExpenseData(data);
    } catch (error) {
      console.error('Error fetching expense data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoriesService.get();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } 
  };

  const onChangeSearch = (query: string) => setSearchQuery(query);

  const formatAmount = (amount: number) => {
    return `Rp${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const renderTabs = () => {
    const tabs = ['Total', ...categories];

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const renderActionButtons = () => {
    const actions = [
      { icon: 'plus', label: 'Add money' },
      { icon: 'swap-horizontal', label: 'Exchange' },
      { icon: 'information-outline', label: 'Details' },
      { icon: 'dots-horizontal', label: 'More' },
    ];

    return (
      <View style={styles.actionButtonsContainer}>
        {actions.map((action) => (
          <TouchableOpacity key={action.label} style={styles.actionButton}>
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons name={action.icon as any} size={24} color="#4285F4" />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTransactionItem = (expense: Expense) => {
    // Generate initials for the avatar
    const initials = expense.category_name.substring(0, 2).toUpperCase();

    return (
      <View key={expense.id} style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <Avatar.Text size={40} label={initials} style={styles.transactionAvatar} />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionTitle}>{expense.description}</Text>
            <Text style={styles.transactionDate}>
              {formatDate(expense.date)}{' '}
              <MaterialCommunityIcons name="clock-outline" size={14} color="#888" />
            </Text>
          </View>
        </View>
        <Text style={styles.transactionAmount}>-{formatAmount(expense.amount)}</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with profile */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={40}
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          />
          <Text style={styles.headerTitle}>Home</Text>
        </View>
        <View style={styles.headerIcons}>
          <IconButton icon="chart-bar" size={24} />
          <IconButton icon="bell-outline" size={24} />
        </View>
      </View>

      {/* Search bar */}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
        iconColor="#888"
      />

      {/* Category tabs */}
      {renderTabs()}

      {/* Balance card */}
      <Card style={styles.balanceCard}>
        <Card.Content>
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.balanceAmount}>
                ${expenseData?.total_amount.toFixed(2) || '0.00'}
              </Text>
              <Text style={styles.balanceCurrency}>Total Expenses</Text>
            </View>
            <IconButton icon="chevron-down" size={24} style={styles.balanceDropdown} />
          </View>

          {/* Action buttons */}
          {renderActionButtons()}
        </Card.Content>
      </Card>

      {/* Transactions section */}
      <View style={styles.transactionsContainer}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Transactions</Text>
          <IconButton icon="dots-horizontal" size={20} />
        </View>

        {expenseData && expenseData.expenses.length > 0 ? (
          <>
            {expenseData.expenses.slice(0, 5).map(renderTransactionItem)}
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noTransactions}>No transactions found</Text>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  searchBar: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EAEAEA',
    elevation: 0,
  },
  tabsContainer: {
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  balanceCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  balanceCurrency: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  balanceDropdown: {
    margin: 0,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF1FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 14,
    color: '#4285F4',
  },
  transactionsContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 80,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAvatar: {
    backgroundColor: '#E8EAFF',
  },
  transactionDetails: {
    marginLeft: 12,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  noTransactions: {
    textAlign: 'center',
    padding: 16,
    color: '#888',
  },
  seeAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  seeAllText: {
    fontSize: 16,
    color: '#4285F4',
    fontWeight: '500',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  activeNavText: {
    color: '#4285F4',
    fontWeight: '500',
  },
});
