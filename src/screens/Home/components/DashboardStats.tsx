import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { getImage } from '../../../assets/images';

interface DashboardStatsProps {
  target: string;
  pencapaian: string;
  totalOmzet: string;
  produktivitas: string;
  pencapaianCampaign: string;
  realisasiVisit: string;
  efectifitasVisit: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  target,
  pencapaian,
  totalOmzet,
  produktivitas,
  pencapaianCampaign,
  realisasiVisit,
  efectifitasVisit,
}) => {
  // Card untuk Total Omzet (horizontal layout)
  const StatCardHorizontal = ({ 
    icon, 
    label, 
    value 
  }: { 
    icon: string; 
    label: string; 
    value: string; 
  }) => (
    <View style={styles.statCardHorizontal}>
      <View style={styles.iconContainer}>
        <Image source={getImage(icon)} style={styles.icon} />
      </View>
      <View style={styles.statContentHorizontal}>
        <Text style={styles.statValueHorizontal}>{value}</Text>
        <Text style={styles.statLabelHorizontal}>{label}</Text>
      </View>
    </View>
  );

  // Card untuk metric lainnya (vertical layout)
  const StatCardVertical = ({ 
    icon, 
    label, 
    value 
  }: { 
    icon: string; 
    label: string; 
    value: string; 
  }) => (
    <View style={styles.statCardVertical}>
      <View style={styles.iconContainer}>
        <Image source={getImage(icon)} style={styles.icon} />
      </View>
      <Text style={styles.statValueVertical}>{value}</Text>
      <Text style={styles.statLabelVertical}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DASHBOARD</Text>
      
      {/* Total Omzet - Full Width Horizontal */}
      <StatCardHorizontal 
        icon="ic_stock_md.png" 
        label="Total Omzet" 
        value={totalOmzet} 
      />

      {/* Target & Pencapaian - Side by Side Vertical */}
      <View style={styles.row}>
        <StatCardVertical 
          icon="ic_stock_md.png" 
          label="Target" 
          value={target} 
        />
        <StatCardVertical 
          icon="ic_stock_md.png" 
          label="Pencapaian" 
          value={pencapaian} 
        />
      </View>

      {/* Produktivitas & Campaign - Side by Side Vertical */}
      <View style={styles.row}>
        <StatCardVertical 
          icon="ic_promotion.png" 
          label="Produktivitas" 
          value={produktivitas} 
        />
        <StatCardVertical 
          icon="ic_promotion.png" 
          label="Campaign" 
          value={pencapaianCampaign} 
        />
      </View>

      {/* Realisasi & Efektivitas - Side by Side Vertical */}
      <View style={styles.row}>
        <StatCardVertical 
          icon="ic_visit.png" 
          label="Realisasi Visit" 
          value={realisasiVisit} 
        />
        <StatCardVertical 
          icon="ic_visit.png" 
          label="Efektivitas" 
          value={efectifitasVisit} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.bold,
    color: colors.grayText,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  // Horizontal Card (untuk Total Omzet)
  statCardHorizontal: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  statContentHorizontal: {
    flex: 1,
    marginLeft: 12,
  },
  statValueHorizontal: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 2,
  },
  statLabelHorizontal: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
  },
  // Vertical Card (untuk metric lainnya)
  statCardVertical: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    marginHorizontal: 4,
  },
  statValueVertical: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 4,
    textAlign: 'center',
  },
  statLabelVertical: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: colors.grayText,
    textAlign: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: colors.white,
  },
});

export default DashboardStats;
