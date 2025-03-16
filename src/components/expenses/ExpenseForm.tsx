import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, useTheme, HelperText, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CategoryList } from '../categories/CategoryList';
import { Expense } from '../../types/expense';

interface ExpenseFormProps {
  initialValues?: Partial<Expense>;
  categories: string[];
  onSubmit: (values: Partial<Expense>) => Promise<void>;
  onCancel: () => void;
}

export function ExpenseForm({ initialValues, categories, onSubmit, onCancel }: ExpenseFormProps) {
  const theme = useTheme();
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [date, setDate] = useState(new Date(initialValues?.date || new Date()));
  const [category, setCategory] = useState<string>(initialValues?.category_name || '');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!amount || isNaN(Number(amount))) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await onSubmit({
        amount: Number(amount),
        description,
        date: date.toISOString().split('T')[0],
        category_name: category || '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        style={styles.input}
        error={!!errors.amount}
      />
      <HelperText type="error" visible={!!errors.amount}>
        {errors.amount}
      </HelperText>

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Button
        mode="outlined"
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        {date.toLocaleDateString()}
      </Button>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryList}>
        <CategoryList
          categories={categories}
          selectedCategory={category}
          onSelect={(value) => setCategory(value)}
        />
      </View>
      {errors.category && (
        <HelperText type="error" visible={!!errors.category}>
          {errors.category}
        </HelperText>
      )}

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
          disabled={loading}
          style={styles.button}
        >
          {initialValues ? 'Update' : 'Create'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxHeight: '80%',
  },
  input: {
    marginBottom: 8,
  },
  label: {
    marginVertical: 8,
  },
  categoryList: {
    height: 200, // Fixed height for the category list
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    paddingBottom: 16,
  },
  button: {
    marginLeft: 8,
  },
}); 