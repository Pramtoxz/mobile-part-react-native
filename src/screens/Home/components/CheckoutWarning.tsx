import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { getImage } from '../../../assets/images';

interface CheckoutWarningProps {
  dealerName: string;
  onCheckout: () => void;
}

const CheckoutWarning: React.FC<CheckoutWarningProps> = ({ dealerName, onCheckout }) => {
  return (
    <View style={styles.container}>
      <Image source={getImage('ic_warning_yellow.png')} style={styles.warningIcon} />
      <View style={styles.content}>
        <Text style={styles.warningText}>You are still checked in</Text>
        <Text style={styles.dealerText}>at {dealerName}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
        <Text style={styles.checkoutButtonText}>Check-out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  warningIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  warningText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  dealerText: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginTop: 2,
  },
  checkoutButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  checkoutButtonText: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.semibold,
    color: colors.primary,
  },
});

export default CheckoutWarning;
