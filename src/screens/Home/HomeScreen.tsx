import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../config/colors';
import { fonts } from '../../config/fonts';
import { Image, View, StyleSheet, Alert } from 'react-native';
import { storage } from '../../services/storage';
import { isNonChannel } from '../../services/constants';
import { User } from '../../types/user';
import { getImage } from '../../assets/images';

const HomeFragment = require('./fragments/HomeFragment').default;
const CatalogueFragment = require('./fragments/CatalogueFragment').default;
const OrderFragment = require('./fragments/OrderFragment').default;
const DealerFragment = require('./fragments/DealerFragment').default;
const ProfileFragment = require('./fragments/ProfileFragment').default;

const Tab = createBottomTabNavigator();

const TabIcon: React.FC<{ icon: any; focused: boolean }> = ({ icon, focused }) => (
  <Image
    source={icon}
    style={[styles.tabIcon, { tintColor: focused ? colors.primary : colors.grayInactive }]}
  />
);

const HomeScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await storage.getUserData();
    setUser(userData);
  };

  const handleTabPress = (routeName: string, navigation: any) => {
    if (isNonChannel(user?.id_role)) {
      if (routeName === 'OrderTab' || routeName === 'DealerTab') {
        Alert.alert('Access Denied', "You don't have access to this feature");
        return false;
      }
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grayInactive,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeFragment}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={getImage('ic_homepage.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CatalogueTab"
        component={CatalogueFragment}
        options={{
          tabBarLabel: 'Catalogue',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={getImage('ic_menu_katalog_en.png')}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderTab"
        component={OrderFragment}
        options={{
          tabBarLabel: 'Order',
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerButton}>
              <Image source={getImage('ic_order_white.png')} style={styles.centerIcon} />
            </View>
          ),
          tabBarButton: isNonChannel(user?.id_role) ? () => null : undefined,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!handleTabPress('OrderTab', navigation)) {
              e.preventDefault();
            }
          },
        })}
      />
      <Tab.Screen
        name="DealerTab"
        component={DealerFragment}
        options={{
          tabBarLabel: 'Dealer',
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={getImage('ic_dealer.png')} focused={focused} />
          ),
          tabBarButton: isNonChannel(user?.id_role) ? () => null : undefined,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            if (!handleTabPress('DealerTab', navigation)) {
              e.preventDefault();
            }
          },
        })}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileFragment}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={getImage('ic_profile.png')}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.white,
    height: 110,
    paddingBottom: 10,
    paddingTop: 22,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  tabLabel: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  tabIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  centerButton: {
    width: 90,
    height: 70,
    borderRadius: 32,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  centerIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});

export default HomeScreen;
