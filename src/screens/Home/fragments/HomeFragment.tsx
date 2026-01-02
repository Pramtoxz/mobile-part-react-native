import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { storage } from '../../../services/storage';
import { User } from '../../../types/user';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import CampaignCard from '../components/CampaignCard';
import StatCard from '../components/StatCard';
import QuickMenuButton from '../components/QuickMenuButton';
import OrderCard from '../components/OrderCard';
import { getImage } from '../../../assets/images';
import { RootStackParamList } from '../../../navigation/types';

type HomeFragmentNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeFragment: React.FC = () => {
  const navigation = useNavigation<HomeFragmentNavigationProp>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await storage.getUserData();
      setUser(userData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleNotificationPress = () => {
    console.log('Notification pressed');
  };

  const handlePartNumberSearch = () => {
    navigation.navigate('PartNumberSearch');
  };

  const handleOrderSuggestion = () => {
    console.log('Order Suggestion pressed');
  };

  const handleCampaignPromo = () => {
    console.log('Campaign Promo pressed');
  };

  const handleOrderPress = (orderNumber: string) => {
    console.log('Order pressed:', orderNumber);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Background Image */}
      <Image source={getImage('bg_honda.webp')} style={styles.backgroundImage} />
      
      {/* Header with gradient background */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={styles.avatarContainer}>
                <Image source={getImage('lg_honda.jpg')} style={styles.avatar} />
              </View>
              <View>
                <Text style={styles.welcomeText}>SALAM SATU HATI,</Text>
                <Text style={styles.nameText}>{user?.name || 'PART MOBILE MENARA AGUNG'}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationButton}>
              <Image source={getImage('ic_notification.png')} style={styles.notificationIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Image source={getImage('ic_spring.png')} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search parts by number or name..."
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
            />
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* White Content Container */}
        <View style={styles.whiteContainer}>
          {/* Quick Menu */}
          <View style={styles.sectionMenu}>
            <View style={styles.sectionHeader}>

            </View>
            <View style={styles.quickMenuContainer}>
              <QuickMenuButton
                icon={getImage('ic_spring.png')}
                label="HGP"
                backgroundColor={colors.white}
                onPress={handlePartNumberSearch}
              />
              <QuickMenuButton
                icon={getImage('ic_stock_md.png')}
                label="Oil"
                backgroundColor={colors.white}
                onPress={handleOrderSuggestion}
              />
              <QuickMenuButton
                icon={getImage('ic_promotion.png')}
                label="Promo"
                backgroundColor={colors.white}
                onPress={handleCampaignPromo}
              />
              <QuickMenuButton
                icon={getImage('ic_spring.png')}
                label="Stock"
                backgroundColor={colors.white}
                onPress={handlePartNumberSearch}
              />
            </View>
          </View>

          {/* Campaign Banner */}
          <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CURRENT CAMPAIGN</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <CampaignCard
            badge="NEW CONTRACT"
            title="Gear Up & Get Rewarded"
            description="Ends Dec 31, 2025 • Target: 85% Reach"
            image={getImage('bg_honda.webp')}
            onPress={handleCampaignPromo}
          />
        </View>

        {/* Achievement Status */}
        <View style={styles.section}>
          <View style={styles.statsContainer}>
            <StatCard
              value="50%"
              label="Contract Reach"
              type="progress"
              progress={50}
            />
            <View style={styles.statSpacer} />
            <StatCard
              value="Rp 12.5M"
              label="Monthly Buy-in"
              icon={<Image source={getImage('ic_promotion.png')} style={styles.statIcon} />}
            />
          </View>
        </View>

        {/* Active Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ACTIVE ORDERS</Text>
            <TouchableOpacity>
              <Text style={styles.trackAllText}>Track All</Text>
            </TouchableOpacity>
          </View>
          <OrderCard
            orderNumber="PO/ABC/231025/001"
            status="On Process"
            statusColor="#F97316"
            amount="Rp 10.5M"
            date="25 Oct 2025"
            onPress={() => handleOrderPress('PO/ABC/231025/001')}
          />
          <OrderCard
            orderNumber="PO/ABC/231025/002"
            status="On Process"
            statusColor="#F97316"
            amount="Rp 10.5M"
            date="25 Oct 2025"
            onPress={() => handleOrderPress('PO/ABC/231025/002')}
          />
        </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
  headerContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grayInactive,
    overflow: 'hidden',
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '90%',
    resizeMode: 'center',
  },
  welcomeText: {
    fontSize: fonts.sizes.tiny,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  nameText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: 'rgba(255, 255, 255, 0.5)',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: fonts.sizes.default,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  whiteContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 24,
    marginTop: 32,
  },
  section: {
    marginBottom: 24,
  },
    sectionMenu: {
    marginBottom: 24,
    backgroundColor: '#DA291C',
    marginTop: 10,
    borderTopLeftRadius: 22,
    borderTopRightRadius:22,
    borderBottomLeftRadius:22,
    borderBottomRightRadius: 20
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.bold,
    color: colors.grayText,
    letterSpacing: 1.2,
  },
  viewAllText: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  trackAllText: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statSpacer: {
    width: 16,
  },
  statIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.primary,
  },
  quickMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeFragment;
