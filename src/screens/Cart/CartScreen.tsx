import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../config/colors';
import { fonts } from '../../config/fonts';
import { getImage } from '../../assets/images';
import { showSuccess, showError } from '../../utils/notification';

type NavigationProp = StackNavigationProp<any>;

interface CartItem {
  id: string;
  code: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const DUMMY_CART: CartItem[] = [
  {
    id: '1',
    code: '17220-K56-N00',
    name: 'Element Cleaner',
    price: 23500,
    quantity: 12,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400',
  },
  {
    id: '2',
    code: '08CLA-K56-N00',
    name: 'Coolant',
    price: 19500,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
  },
  {
    id: '3',
    code: '06455-K59-N00',
    name: 'Drive Belt',
    price: 95000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=400',
  },
];

const CartScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [cartItems, setCartItems] = useState<CartItem[]>(DUMMY_CART);

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleCreatePO = () => {
    showSuccess('Create PO functionality will be implemented');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={getImage('ic_back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Cart Items */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {cartItems.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemCode}>{item.code}</Text>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text style={styles.qtyButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{formatPrice(calculateTotal())}</Text>
        <TouchableOpacity style={styles.createPOButton} onPress={handleCreatePO}>
          <Text style={styles.createPOButtonText}>Create PO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayDivider,
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: colors.black,
  },
  headerTitle: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
  },
  itemCode: {
    fontSize: 11,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginBottom: 4,
  },
  itemName: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.semibold,
    color: colors.black,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  qtyValue: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.black,
    minWidth: 24,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.grayDivider,
  },
  totalLabel: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.regular,
    color: colors.black,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 20,
  },
  createPOButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  createPOButtonText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default CartScreen;
