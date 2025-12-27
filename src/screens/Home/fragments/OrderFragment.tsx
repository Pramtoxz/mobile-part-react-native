import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';

const OrderFragment: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Screen</Text>
      <Text style={styles.subtext}>Coming soon...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  text: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  subtext: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.regular,
    color: colors.grayText,
    marginTop: 8,
  },
});

export default OrderFragment;
