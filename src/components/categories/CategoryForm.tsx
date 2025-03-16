import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

interface CategoryFormProps {
  currentCategory?: string;
  onSubmit: (newCategory: string, oldCategory?: string) => void;
  onCancel: () => void;
}

export function CategoryForm({ currentCategory, onSubmit, onCancel }: CategoryFormProps) {
  const [newCategory, setNewCategory] = useState(currentCategory || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    try {
      setLoading(true);
      onSubmit(newCategory, currentCategory);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Category Name"
        value={newCategory}
        onChangeText={setNewCategory}
        style={styles.input}
      />

      <View style={styles.buttons}>
        <Button mode="outlined" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={!newCategory || loading}
          style={styles.button}
        >
          {currentCategory ? 'Update' : 'Create'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 8,
  },
});
