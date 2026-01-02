import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';

interface CampaignCardProps {
  title: string;
  description: string;
  badge: string;
  image: ImageSourcePropType;
  onPress: () => void;
}
const Banner=[
   'https://hondampspandeglang.com/wp-content/uploads/2021/09/banner-program-sales-genio-1-02082021-094721.png',
]


const CampaignCard: React.FC<CampaignCardProps> = ({ title, description, badge, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image source={{uri: Banner[0]}} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: fonts.sizes.tiny,
    fontFamily: fonts.bold,
    color: colors.white,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 4,
  },
  description: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.regular,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default CampaignCard;
