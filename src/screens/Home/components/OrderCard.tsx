import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { getImage } from '../../../assets/images';

interface OrderCardProps {
  orderNumber: string;
  status: string;
  statusColor: string;
  amount: string;
  date: string;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderNumber, status, statusColor, amount, date, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Image source={getImage('ic_spring.png')} style={styles.icon} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
          <Text style={styles.statusLabel}>
            Status: <Text style={[styles.status, { color: statusColor }]}>{status}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.grayText,
  },
  infoContainer: {
    flex: 1,
  },
  orderNumber: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 4,
  },
  statusLabel: {
    fontSize: fonts.sizes.tiny,
    fontFamily: fonts.regular,
    color: colors.grayText,
    textTransform: 'uppercase',
  },
  status: {
    fontFamily: fonts.bold,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 4,
  },
  date: {
    fontSize: fonts.sizes.tiny,
    fontFamily: fonts.regular,
    color: colors.grayText,
  },
});

export default OrderCard;
