import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { storage } from '../../../services/storage';
import apiService from '../../../services/api';
import { User } from '../../../types/user';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import MenuCard from '../components/MenuCard';
import { getImage } from '../../../assets/images';
import { showSuccess, showError } from '../../../utils/notification';

const HomeFragment: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await storage.getUserData();
      setUser(userData);

      const statusResponse = await apiService.checkCheckinStatus();
      if (statusResponse.status === 1) {
        setCheckInStatus(statusResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!checkInStatus?.code_visit) return;

    try {
      const response = await apiService.checkout(checkInStatus.code_visit);
      if (response.status === 1) {
        showSuccess('Check-out successful');
        setCheckInStatus(null);
      } else {
        showError(response.message.join(', '));
      }
    } catch (error) {
      showError('Failed to check-out');
    }
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handlePartNumberSearch = () => {
    console.log('Part Number Search pressed');
  };

  const handleOrderSuggestion = () => {
    console.log('Order Suggestion pressed');
  };

  const handleCampaignPromo = () => {
    console.log('Campaign Promo pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Image source={getImage('bg_honda.webp')} style={styles.backgroundImage} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingText}>Hello,</Text>
            <Text style={styles.nameText}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationButton}>
            <Image source={getImage('ic_notification.png')} style={styles.notificationIcon} />
          </TouchableOpacity>
        </View>

        {checkInStatus?.is_checked_in && (
          <View style={styles.checkoutWarningCard}>
            <Image source={getImage('ic_warning_yellow.png')} style={styles.warningIcon} />
            <View style={styles.warningContent}>
              <Text style={styles.warningText}>You are still checked in</Text>
              <Text style={styles.dealerText}>at {checkInStatus.dealer_name}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Check-out</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.menuContainer}>
          <MenuCard
            icon="ic_spring.png"
            label="Part Number Search"
            onPress={handlePartNumberSearch}
          />
          <MenuCard
            icon="ic_stock_md.png"
            label="Order Suggestion"
            onPress={handleOrderSuggestion}
          />
          <MenuCard
            icon="ic_promotion.png"
            label="Promo Campaign"
            onPress={handleCampaignPromo}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContent: {
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  greetingText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  nameText: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.white,
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  checkoutWarningCard: {
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
  warningContent: {
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
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginTop: 16,
  },
});

export default HomeFragment;
