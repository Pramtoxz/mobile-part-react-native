import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../config/colors';
import { fonts } from '../config/fonts';

interface CustomInputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  onRightIconPress?: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  leftIcon,
  rightIcon,
  error,
  onRightIconPress,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error && styles.inputContainerError,
      ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.grayHint}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: fonts.sizes.small,
    color: colors.grayHint,
    marginBottom: 8,
    marginLeft: 16,
    fontFamily: fonts.regular,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.grayBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
  },
  inputContainerError: {
    borderColor: colors.primary,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    fontSize: fonts.sizes.default,
    color: colors.black,
    fontFamily: fonts.regular,
    padding: 0,
  },
  errorText: {
    fontSize: fonts.sizes.small,
    color: colors.primary,
    marginTop: 4,
    marginLeft: 16,
    fontFamily: fonts.regular,
  },
});

export default CustomInput;
