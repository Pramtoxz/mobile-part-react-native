import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { storage } from '../../../services/storage';
import apiService from '../../../services/api';
import { User } from '../../../types/user';
import { DashboardData } from '../../../types/dashboard';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import MenuCard from '../components/MenuCard';
import CheckoutWarning from '../components/CheckoutWarning';
import MonthPicker from '../components/MonthPicker';
import DashboardStats from '../components/DashboardStats';
import MyRankCard from '../components/MyRankCard';
import LeaderboardList from '../components/LeaderboardList';
import { getImage } from '../../../assets/images';
import { showSuccess, showError } from '../../../utils/notification';

const HomeFragment: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [checkInStatus, setCheckInStatus] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState('December 2024');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [selectedMonth, user]);

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
    }
  };

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [month, year] = selectedMonth.split(' ');
      
      const response = await apiService.getDashboard({
        category: 'salesman',
        month,
        year,
        ms_dealer_id: '',
      });

      if (response.status === 1 && response.data) {
        setDashboardData(response.data);
      } else {
        showError(response.message?.join(', ') || 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      showError('Failed to load dashboard data');
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

  const handlePhotoPress = (photoUrl: string) => {
    Alert.alert('Photo', photoUrl);
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

        <View style={styles.whiteBackground}>
          <MonthPicker selectedMonth={selectedMonth} onMonthSelect={setSelectedMonth} />

          {checkInStatus?.is_checked_in && (
            <CheckoutWarning
              dealerName={checkInStatus.dealer_name}
              onCheckout={handleCheckout}
            />
          )}

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            dashboardData && (
              <>
                <DashboardStats
                  target={dashboardData.target}
                  pencapaian={dashboardData.pencapaian}
                  totalOmzet={dashboardData.totalOmzet}
                  produktivitas={dashboardData.produktivitas}
                  pencapaianCampaign={dashboardData.pencapaianCampaign}
                  realisasiVisit={dashboardData.realisasiVisit}
                  efectifitasVisit={dashboardData.efectifitasVisit}
                />

                {dashboardData.myRank && (
                  <MyRankCard myRank={dashboardData.myRank} onPhotoPress={handlePhotoPress} />
                )}

                {dashboardData.salesManRank && dashboardData.salesManRank.length > 0 && (
                  <LeaderboardList
                    data={dashboardData.salesManRank}
                    onPhotoPress={handlePhotoPress}
                  />
                )}
              </>
            )
          )}
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
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
});

export default HomeFragment;
