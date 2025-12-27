import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { colors } from '../../../config/colors';
import apiService from '../../../services/api';
import { storage } from '../../../services/storage';
import { DashboardData } from '../../../types/dashboard';
import { User } from '../../../types/user';
import DashboardStats from '../components/DashboardStats';
import MyRankCard from '../components/MyRankCard';
import LeaderboardList from '../components/LeaderboardList';
import { showError } from '../../../utils/notification';

interface SalesmanFragmentProps {
  selectedMonth: string;
}

const SalesmanFragment: React.FC<SalesmanFragmentProps> = ({ selectedMonth }) => {
  const [user, setUser] = useState<User | null>(null);
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
    } catch (error) {
      console.error('Error loading user data:', error);
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

  const handlePhotoPress = (photoUrl: string) => {
    Alert.alert('Photo', photoUrl);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.whiteBackground}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {dashboardData && (
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
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

export default SalesmanFragment;
