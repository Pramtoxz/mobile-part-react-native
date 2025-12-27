import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';

interface MonthPickerProps {
  selectedMonth: string;
  onMonthSelect: (month: string) => void;
}

const MONTHS = [
  'January 2024',
  'February 2024',
  'March 2024',
  'April 2024',
  'May 2024',
  'June 2024',
  'July 2024',
  'August 2024',
  'September 2024',
  'October 2024',
  'November 2024',
  'December 2024',
];

const MonthPicker: React.FC<MonthPickerProps> = ({ selectedMonth, onMonthSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (month: string) => {
    onMonthSelect(month);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
        <Text style={styles.pickerText}>{selectedMonth}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={MONTHS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.monthItem,
                    item === selectedMonth && styles.selectedMonthItem,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.monthText,
                      item === selectedMonth && styles.selectedMonthText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  pickerText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  arrow: {
    fontSize: fonts.sizes.small,
    color: colors.grayText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: '80%',
    maxHeight: '60%',
    overflow: 'hidden',
  },
  monthItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedMonthItem: {
    backgroundColor: '#FFF5F5',
  },
  monthText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  selectedMonthText: {
    fontFamily: fonts.bold,
    color: colors.primary,
  },
});

export default MonthPicker;
