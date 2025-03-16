import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { ColorPicker } from '../common/ColorPicker';
import { IconPicker } from '../common/IconPicker';

interface CategoryFormProps {
  initialValues?: string;
  onSubmit: (values: string) => Promise<void>;
  onCancel: () => void;
}

export function CategoryForm({ initialValues, onSubmit, onCancel }: CategoryFormProps) {
  const theme = useTheme();
  const [name, setName] = useState(initialValues || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit(name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Category Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <View style={styles.buttons}>
        <Button
          mode="outlined"
          onPress={onCancel}
          style={styles.button}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={!name || loading}
          style={styles.button}
        >
          {initialValues ? 'Update' : 'Create'}
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