import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { fonts } from '../../../config/fonts';

interface StatCardProps {
  value: string;
  label: string;
  type?: 'progress' | 'value';
  progress?: number;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, type = 'value', progress = 0, icon }) => {
  return (
    <View style={styles.container}>
      {type === 'progress' ? (
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <View style={[styles.progressFill, { height: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{value}</Text>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      <Text style={styles.value}>{type === 'value' ? value : ''}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  progressContainer: {
    width: 64,
    height: 64,
    marginBottom: 8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: '#F5F5F5',
    overflow: 'hidden',
    position: 'absolute',
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.bold,
    color: colors.black,
  },
  iconContainer: {
    marginBottom: 8,
  },
  value: {
    fontSize: fonts.sizes.large,
    fontFamily: fonts.bold,
    color: colors.black,
    marginBottom: 4,
  },
  label: {
    fontSize: fonts.sizes.tiny,
    fontFamily: fonts.bold,
    color: colors.grayText,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default StatCard;
