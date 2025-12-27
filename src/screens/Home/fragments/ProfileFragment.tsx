import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { storage } from '../../../services/storage';
import { authService } from '../../../services/auth';
import { User } from '../../../types/user';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { RootStackParamList } from '../../../navigation/types';
import CustomAlert from '../../../components/CustomAlert';

type ProfileNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileFragment: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await storage.getUserData();
    setUser(userData);
  };

  const handleLogout = () => {
    setShowLogoutAlert(true);
  };

  const confirmLogout = async () => {
    setShowLogoutAlert(false);
    await authService.logout();
    navigation.replace('Login');
  };

  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.nameText}>{user?.name || 'User'}</Text>
        <Text style={styles.emailText}>{user?.email || 'email@example.com'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}></Text>
          <Text style={styles.menuText}>Profile Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}></Text>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}></Text>
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <Text style={styles.menuIcon}></Text>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={showLogoutAlert}
        title="Logout"
        message="Apakah Anda Yakin Ingin Keluar?"
        type="confirm"
        confirmText="Yes"
        cancelText="Cancel"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.primary,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontFamily: fonts.bold,
    color: colors.primary,
  },
  nameText: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  emailText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  logoutItem: {
    backgroundColor: '#FFEBEE',
    marginTop: 24,
  },
  logoutText: {
    color: colors.primary,
  },
});

export default ProfileFragment;
