import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';

interface QuickMenuButtonProps {
  icon: ImageSourcePropType;
  label: string;
  backgroundColor: string;
  onPress: () => void;
}

const QuickMenuButton: React.FC<QuickMenuButtonProps> = ({ icon, label, backgroundColor, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor }]}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 70,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 3,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'center',
  },
  label: {
    fontSize: fonts.sizes.tiny,
    fontFamily: fonts.bold,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20
  },
});

export default QuickMenuButton;
