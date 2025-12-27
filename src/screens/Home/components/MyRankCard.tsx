import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { MyRank } from '../../../types/dashboard';
import { getImage } from '../../../assets/images';

interface MyRankCardProps {
  myRank: MyRank;
  onPhotoPress?: (photoUrl: string) => void;
}

const MyRankCard: React.FC<MyRankCardProps> = ({ myRank, onPhotoPress }) => {
  const getRankColor = () => {
    if (myRank.type === 'NAIK') return '#4CAF50';
    if (myRank.type === 'TURUN') return colors.primary;
    return colors.grayText;
  };

  const getRankIndicator = () => {
    if (myRank.type === 'NAIK') return '↑';
    if (myRank.type === 'TURUN') return '↓';
    return '-';
  };

  return (
    <View style={[styles.container, { backgroundColor: getRankColor() }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Rank</Text>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{myRank.rank}</Text>
          {myRank.type !== 'BERTAHAN' && (
            <Text style={styles.rankIndicator}>{getRankIndicator()}</Text>
          )}
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => onPhotoPress?.(myRank.photo)}>
          <Image
            source={{ uri: myRank.photo }}
            style={styles.photo}
            defaultSource={getImage('ic_profile.png')}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{myRank.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.white,
  },
  rankIndicator: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.white,
    marginLeft: 4,
  },
  content: {
    alignItems: 'center',
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  name: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
});

export default MyRankCard;
