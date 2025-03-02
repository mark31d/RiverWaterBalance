// components/DropDown.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DropDown({ options, selectedValue, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.selectedBox} 
        onPress={() => setOpen(!open)}
      >
        <Text>{selectedValue}</Text>
        <Text>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.optionsContainer}>
          {options.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionItem,
                item === selectedValue && styles.activeOption,
              ]}
              onPress={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 10,
  },
  selectedBox: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Тень
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionsContainer: {
    backgroundColor: '#FFF',
    marginTop: 5,
    borderRadius: 8,

    // Тень
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionItem: {
    padding: 10,
  },
  activeOption: {
    borderWidth: 2,
    borderColor: '#B09157',
    borderRadius:15,
  },
});