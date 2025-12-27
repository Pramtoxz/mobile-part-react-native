import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomInput from '../../components/CustomInput';
import LoadingDialog from '../../components/LoadingDialog';
import { authService } from '../../services/auth';
import { colors } from '../../config/colors';
import { fonts } from '../../config/fonts';
import { RootStackParamList } from '../../navigation/types';
import { getImage } from '../../assets/images';
import { showError } from '../../utils/notification';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', password: '' });

  const validateInputs = (): boolean => {
    let isValid = true;
    const newErrors = { username: '', password: '' };

    if (!username.trim()) {
      newErrors.username = 'User ID is required';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      await authService.login(username.trim(), password);
      navigation.replace('Home');
    } catch (error: any) {
      showError(error.message || 'An error occurred', 'Login Failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <Image source={getImage('bg_honda.webp')} style={styles.backgroundImage} />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>Please login to continue</Text>
        </View>

        <View style={styles.formCard}>
          <CustomInput
            label="User ID"
            placeholder="Enter user ID"
            value={username}
            onChangeText={setUsername}
            error={errors.username}
            autoCapitalize="none"
            returnKeyType="next"
            leftIcon={<Image source={getImage('ic_username.png')} style={styles.inputIcon} />}
          />

          <CustomInput
            label="Password"
            placeholder="Type password"
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry={!isPasswordVisible}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            leftIcon={<Image source={getImage('ic_password.png')} style={styles.inputIcon} />}
            rightIcon={<Image source={getImage('ic_visible.png')} style={styles.inputIcon} />}
            onRightIconPress={() => setIsPasswordVisible(!isPasswordVisible)}
          />

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LoadingDialog visible={isLoading} message="Logging in..." />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  headerSection: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: fonts.sizes.huge,
    fontFamily: fonts.bold,
    color: colors.white,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.regular,
    color: colors.white,
  },
  formCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  inputIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 12,
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: fonts.sizes.default,
    fontFamily: fonts.semibold,
    color: colors.black,
  },
  loginButton: {
    backgroundColor: colors.primary,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    fontSize: fonts.sizes.medium,
    fontFamily: fonts.semibold,
    color: colors.white,
  },
});

export default LoginScreen;
