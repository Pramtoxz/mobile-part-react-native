import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { LeaderboardItem } from '../../../types/dashboard';
import { getImage } from '../../../assets/images';

interface LeaderboardListProps {
  data: LeaderboardItem[];
  onPhotoPress?: (photoUrl: string) => void;
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ data, onPhotoPress }) => {
  const getRankIndicator = (type: string) => {
    if (type === 'NAIK') return { icon: '↑', color: '#4CAF50' };
    if (type === 'TURUN') return { icon: '↓', color: colors.primary };
    return null;
  };

  const renderItem = ({ item, index }: { item: LeaderboardItem; index: number }) => {
    const indicator = getRankIndicator(item.type);

    return (
      <View style={styles.item}>
        <Text style={styles.position}>{index + 1}</Text>
        <TouchableOpacity onPress={() => onPhotoPress?.(item.photo)}>
          <Image
            source={{ uri: item.photo }}
            style={styles.photo}
            defaultSource={getImage('ic_profile.png')}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{item.name}</Text>
        {indicator && (
          <Text style={[styles.indicator, { color: indicator.color }]}>
            {indicator.icon}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  position: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.bold,
    color: colors.black,
    width: 30,
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: fonts.sizes.default,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  indicator: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.bold,
  },
});

export default LeaderboardList;
