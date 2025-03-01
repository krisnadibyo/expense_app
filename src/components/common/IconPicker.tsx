import { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Modal, Portal, useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const ICONS = [
  'tag', 'food', 'cart', 'car', 'home', 'medical-bag',
  'school', 'airplane', 'movie', 'music', 'gamepad-variant',
  'gift', 'tshirt-crew', 'phone', 'laptop', 'cash',
  'credit-card', 'bank', 'train', 'bus', 'bike',
  'beach', 'basketball', 'book', 'camera', 'palette',
];

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  style?: any;
}

export function IconPicker({ selectedIcon, onSelectIcon, style }: IconPickerProps) {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();

  return (
    <>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => setVisible(true)}
      >
        <Text>Select Icon</Text>
        <Icon name={selectedIcon} size={24} color={theme.colors.primary} />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text variant="titleLarge" style={styles.title}>Select Icon</Text>
          <ScrollView>
            <View style={styles.grid}>
              {ICONS.map(icon => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconItem,
                    icon === selectedIcon && styles.selected,
                  ]}
                  onPress={() => {
                    onSelectIcon(icon);
                    setVisible(false);
                  }}
                >
                  <Icon name={icon} size={32} color={theme.colors.onSurface} />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconItem: {
    width: 60,
    height: 60,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    borderColor: '#000',
  },
}); 