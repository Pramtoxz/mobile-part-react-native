import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from './constants';
import { User } from '../types/user';

export const storage = {
  async saveAccessToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  async getAccessToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  async saveSessionId(sessionId: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
  },

  async getSessionId(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.SESSION_ID);
  },

  async saveUserData(user: User): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  async getUserData(): Promise<User | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  async saveUserId(userId: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  },

  async getUserId(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
  },

  async savePassword(encryptedPassword: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.PASSWORD, encryptedPassword);
  },

  async getPassword(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.PASSWORD);
  },

  async saveIdRole(idRole: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.ID_ROLE, idRole);
  },

  async getIdRole(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.ID_ROLE);
  },

  async saveFcmId(fcmId: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.FCM_ID, fcmId);
  },

  async getFcmId(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.FCM_ID);
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.SESSION_ID,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.USER_ID,
      STORAGE_KEYS.PASSWORD,
      STORAGE_KEYS.ID_ROLE,
      STORAGE_KEYS.FCM_ID,
    ]);
  },
};
