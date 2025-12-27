import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';

interface CategoryTabsProps {
  activeTab: 'salesman' | 'dealer';
  onTabChange: (tab: 'salesman' | 'dealer') => void;
  showSalesmanTab?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeTab,
  onTabChange,
  showSalesmanTab = true,
}) => {
  return (
    <View style={styles.container}>
      {showSalesmanTab && (
        <TouchableOpacity
          style={[styles.tab, activeTab === 'salesman' && styles.activeTab]}
          onPress={() => onTabChange('salesman')}
        >
          <Text style={[styles.tabText, activeTab === 'salesman' && styles.activeTabText]}>
            Salesman
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={[styles.tab, activeTab === 'dealer' && styles.activeTab]}
        onPress={() => onTabChange('dealer')}
      >
        <Text style={[styles.tabText, activeTab === 'dealer' && styles.activeTabText]}>
          Dealer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.semibold,
    color: colors.grayText,
  },
  activeTabText: {
    color: colors.white,
  },
});

export default CategoryTabs;
