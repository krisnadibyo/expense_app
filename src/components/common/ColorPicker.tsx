import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const COLORS = [
  '#F44336', '#E91E63', '#9C27B0', '#673AB7',
  '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
];

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  style?: any;
}

export function ColorPicker({ selectedColor, onSelectColor, style }: ColorPickerProps) {
  return (
    <View style={[styles.container, style]}>
      <Text>Select Color</Text>
      <View style={styles.grid}>
        {COLORS.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorItem,
              { backgroundColor: color },
              color === selectedColor && styles.selected,
            ]}
            onPress={() => onSelectColor(color)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  colorItem: {
    width: 40,
    height: 40,
    margin: 4,
    borderRadius: 20,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#000',
  },
}); 