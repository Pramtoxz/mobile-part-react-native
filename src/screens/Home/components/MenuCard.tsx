import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';
import { getImage } from '../../../assets/images';

interface MenuCardProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={getImage(icon)} style={styles.icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 100,
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 8,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  label: {
    fontSize: fonts.sizes.small,
    fontFamily: fonts.semibold,
    color: colors.white,
    textAlign: 'center',
  },
});

export default MenuCard;
