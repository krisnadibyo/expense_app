import { Tabs } from 'expo-router';
import { Avatar, IconButton, Text, useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native';
import { theme } from '../../src/constants/theme';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        header: Header,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Icon name="view-dashboard" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color, size }) => <Icon name="currency-usd" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, size }) => <Icon name="tag-multiple" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Icon name="cog" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const Header = ({ route }: { route: any }) => {
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={32}
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
        />
        <Text style={styles.headerTitle}>{route.name}</Text>
      </View>
      <View style={styles.headerIcons}>
        <IconButton icon="chart-bar" size={24} />
        <IconButton icon="bell-outline" size={24} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
