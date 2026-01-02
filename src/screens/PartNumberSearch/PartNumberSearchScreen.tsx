import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../../config/colors';
import { fonts } from '../../config/fonts';
import { getImage } from '../../assets/images';
import { showSuccess } from '../../utils/notification';

type NavigationProp = StackNavigationProp<any>;

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

interface Part {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  averageLastOrder: number;
  image: string;
}

const DUMMY_PARTS: Part[] = [
  {
    id: '1',
    code: '17220-K56-N00',
    name: 'Element Cleaner',
    description: 'Air filter element for Honda motorcycles. High quality replacement part.',
    price: 23500,
    stock: 45,
    averageLastOrder: 15,
    image: 'https://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/hgp/thumbnail/element-cleaner-18082022-095022-12092022-051732.png',
  },
  {
    id: '2',
    code: '08CLA-K56-N00',
    name: 'Coolant',
    description: 'Premium coolant fluid for optimal engine temperature control.',
    price: 19500,
    stock: 120,
    averageLastOrder: 25,
    image: 'https://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/hgp/thumbnail/fungsi-cairan-pendingin-coolant-image.png',
  },
  {
    id: '3',
    code: '06455-K59-N00',
    name: 'Brake Pad',
    description: 'Front brake pad set. Original quality for safe braking.',
    price: 125000,
    stock: 30,
    averageLastOrder: 8,
    image: 'https://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/hgp/thumbnail/disc-clutch.png',
  },
  {
    id: '4',
    code: '42711-K56-N01',
    name: 'Tire',
    description: 'High performance motorcycle tire with excellent grip.',
    price: 285000,
    stock: 15,
    averageLastOrder: 5,
    image: 'http://ik.imagekit.io/zlt25mb52fx/ahmcdn/uploads/page/information/ahm-2021-wrist-band-tyre-ban-ditumpuk-020221.png',
  },
];

const CAMPAIGN_BANNERS = [
  'https://hondampspandeglang.com/wp-content/uploads/2021/09/banner-program-sales-genio-1-02082021-094721.png',
  'https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2025/08/13/3883945296.jpeg',
  'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800',
];

const CAMPAIGN_CATEGORIES = ['HGP', 'AHM OIL', 'APP'];

const PartNumberSearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(3);
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const handlePartPress = (part: Part) => {
    setSelectedPart(part);
    setShowDetailModal(true);
  };

  const handleAddToCart = () => {
    setShowDetailModal(false);
    setQuantity(selectedPart?.averageLastOrder || 1);
    setShowQtyModal(true);
  };

  const handleConfirmQty = () => {
    setShowQtyModal(false);
    setCartCount(prev => prev + 1);
    showSuccess(`Added ${quantity} ${selectedPart?.name} to cart`);
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  const incrementQty = () => setQuantity(prev => prev + 1);
  const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.dealerCode}>PT. Menara Agung</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
                <Image source={getImage('ic_cart_response.png')} style={styles.headerIcon} />
                {cartCount > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Image source={getImage('ic_notification.png')} style={styles.headerIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image source={getImage('ic_search.png')} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Parts Number / Parts Description"
              placeholderTextColor={colors.grayHint}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.sortButton}>
              <Image source={getImage('ic_sort_by.png')} style={styles.sortIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Campaign Section */}
        <View style={styles.campaignSection}>
          <View style={styles.campaignHeader}>
            <Text style={styles.campaignTitle}>Campaign</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See More {'>'}</Text>
            </TouchableOpacity>
          </View>

          {/* Campaign Banner */}
          <View style={styles.bannerContainer}>
            <Image 
              source={{ uri: CAMPAIGN_BANNERS[selectedCampaign] }} 
              style={styles.bannerImage}
            />
          </View>

          {/* Campaign Dots */}
          <View style={styles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  selectedCampaign === index && styles.dotActive,
                ]}
              />
            ))}
          </View>

          {/* Campaign Categories */}
          <View style={styles.campaignCategories}>
            {CAMPAIGN_CATEGORIES.map((category, index) => (
              <TouchableOpacity
                key={category}
                style={styles.categoryButton}
                onPress={() => setSelectedCampaign(index)}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Products Grid */}
        <View style={styles.productsContainer}>
          <View style={styles.productsRow}>
            {DUMMY_PARTS.slice(0, 2).map((part) => (
              <TouchableOpacity 
                key={part.id} 
                style={styles.productCard}
                onPress={() => handlePartPress(part)}
              >
                <View style={styles.productImageContainer}>
                  <Image 
                    source={{ uri: part.image }} 
                    style={styles.productImage}
                  />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productCode}>{part.code}</Text>
                  <Text style={styles.productName} numberOfLines={2}>
                    {part.name}
                  </Text>
                  <Text style={styles.productPrice}>{formatPrice(part.price)}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => handlePartPress(part)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.productsRow}>
            {DUMMY_PARTS.slice(2, 4).map((part) => (
              <TouchableOpacity 
                key={part.id} 
                style={styles.productCard}
                onPress={() => handlePartPress(part)}
              >
                <View style={styles.productImageContainer}>
                  <Image 
                    source={{ uri: part.image }} 
                    style={styles.productImage}
                  />
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productCode}>{part.code}</Text>
                  <Text style={styles.productName} numberOfLines={2}>
                    {part.name}
                  </Text>
                  <Text style={styles.productPrice}>{formatPrice(part.price)}</Text>
                  <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => handlePartPress(part)}
                  >
                    <Text style={styles.addButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalClose}
              onPress={() => setShowDetailModal(false)}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>

            {selectedPart && (
              <>
                <Image 
                  source={{ uri: selectedPart.image }} 
                  style={styles.modalImage}
                />
                <Text style={styles.modalCode}>{selectedPart.code}</Text>
                <Text style={styles.modalName}>{selectedPart.name}</Text>
                <Text style={styles.modalDescription}>{selectedPart.description}</Text>
                
                <View style={styles.modalInfoRow}>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoLabel}>Price</Text>
                    <Text style={styles.modalInfoValue}>{formatPrice(selectedPart.price)}</Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Text style={styles.modalInfoLabel}>Stock</Text>
                    <Text style={styles.modalInfoValue}>{selectedPart.stock} pcs</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.modalAddButton}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.modalAddButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Quantity Modal */}
      <Modal
        visible={showQtyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowQtyModal(false)}
      >
        <TouchableOpacity 
          style={styles.qtyModalOverlay}
          activeOpacity={1}
          onPress={() => setShowQtyModal(false)}
        >
          <View style={styles.qtyModalContent}>
            {selectedPart && (
              <>
                <View style={styles.qtyHeader}>
                  <View>
                    <Text style={styles.qtyCode}>{selectedPart.code}</Text>
                    <Text style={styles.qtyName}>{selectedPart.name}</Text>
                  </View>
                  <View style={styles.qtyAverage}>
                    <Text style={styles.qtyAverageLabel}>Average Last Order</Text>
                    <Text style={styles.qtyAverageValue}>{selectedPart.averageLastOrder} pcs</Text>
                  </View>
                </View>

                <View style={styles.qtyControls}>
                  <Text style={styles.qtyPrice}>{formatPrice(selectedPart.price)}</Text>
                  <View style={styles.qtyButtons}>
                    <TouchableOpacity 
                      style={styles.qtyButton}
                      onPress={decrementQty}
                    >
                      <Text style={styles.qtyButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{quantity}</Text>
                    <TouchableOpacity 
                      style={styles.qtyButton}
                      onPress={incrementQty}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.qtyConfirmButton}
                  onPress={handleConfirmQty}
                >
                  <Text style={styles.qtyConfirmText}>Confirm</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dealerCode: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 4,
    position: 'relative',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: colors.black,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    fontSize: 10,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.primary,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.regular,
    color: colors.black,
    padding: 0,
  },
  sortButton: {
    padding: 4,
  },
  sortIcon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
  campaignSection: {
    backgroundColor: colors.white,
    marginTop: 8,
    paddingVertical: 16,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  campaignTitle: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  seeMoreText: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  bannerContainer: {
    marginHorizontal: 16,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
  campaignCategories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  productsContainer: {
    padding: 16,
  },
  productsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImageContainer: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productCode: {
    fontSize: 11,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginBottom: 4,
  },
  productName: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.semibold,
    color: colors.black,
    marginBottom: 8,
    minHeight: 32,
  },
  productPrice: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  modalClose: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modalCloseText: {
    fontSize: 32,
    color: colors.grayText,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  modalCode: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginBottom: 4,
  },
  modalName: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginBottom: 20,
    lineHeight: 22,
  },
  modalInfoRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16,
  },
  modalInfoItem: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
  },
  modalInfoLabel: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginBottom: 4,
  },
  modalInfoValue: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  modalAddButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalAddButtonText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  qtyModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  qtyModalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  qtyHeader: {
    marginBottom: 20,
  },
  qtyCode: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginBottom: 4,
  },
  qtyName: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 12,
  },
  qtyAverage: {
    marginTop: 8,
  },
  qtyAverageLabel: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
  },
  qtyAverageValue: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  qtyControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  qtyPrice: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  qtyButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  qtyValue: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
    minWidth: 40,
    textAlign: 'center',
  },
  qtyConfirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  qtyConfirmText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default PartNumberSearchScreen;
