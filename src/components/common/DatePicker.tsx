import React from 'react';
import { Platform, View } from 'react-native';
import { Button } from 'react-native-paper';
import NativeDateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  showPicker: boolean;
  onTogglePicker: () => void;
}

export function DatePicker({ label,value, onChange, showPicker, onTogglePicker }: DatePickerProps) {
  // Format date as YYYY-MM-DD for web input
  const formatDateForWeb = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  if (Platform.OS === 'web') {
    // Web implementation using HTML input type="date"
    return (
      <View>
        <div style={{ marginBottom: 8 }}>
          <label style={{ color: 'black', fontStyle: 'bold', fontSize: 14, marginBottom: 4, display: 'block' }}>{label}</label>
          <input
            type="date"
            value={formatDateForWeb(value)}
            onChange={(e) => {
              if (e.target.value) {
                onChange(new Date(e.target.value));
              }
            }}
            style={{
              height: 56,
              padding: '0 12px',
              fontSize: 16,
              borderRadius: 4,
              border: '1px solid #ccc',
            }}
          />
        </div>
      </View>
    );
  } else {
    // Native implementation for iOS/Android
    return (
      <View>
        <Button mode="outlined" onPress={onTogglePicker}>
          {value.toLocaleDateString()}
        </Button>

        {showPicker && (
          <NativeDateTimePicker
            value={value}
            mode="date"
            onChange={(event, selectedDate) => {
              onTogglePicker();
              if (selectedDate) {
                onChange(selectedDate);
              }
            }}
          />
        )}
      </View>
    );
  }
}
