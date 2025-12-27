import apiService from './api';
import { storage } from './storage';
import { encryptPassword } from '../utils/encryption';
import { User } from '../types/user';

export const authService = {
  async getOAuthToken(): Promise<string> {
    try {
      const response = await apiService.getOAuthToken();
      
      if (response.status === 1 && response.data?.token) {
        const token = response.data.token;
        await storage.saveAccessToken(token);
        return token;
      }
      
      throw new Error(response.message?.[0] || 'Failed to get OAuth token');
    } catch (error: any) {
      throw new Error(error.message || 'Network error');
    }
  },

  async login(username: string, password: string): Promise<User> {
    try {
      // First, get OAuth token
      await this.getOAuthToken();

      // Get FCM token (placeholder - implement Firebase later)
      const fcmId = await storage.getFcmId() || 'placeholder-fcm-token';

      // Then, login with credentials
      const response = await apiService.login({
        email: username,
        password,
        regid: fcmId,
      });

      if (response.status === 1 && response.data) {
        const { data } = response;
        
        // Save session data
        if (data.session_id) {
          await storage.saveSessionId(data.session_id);
        }
        
        await storage.saveUserId(username);
        await storage.savePassword(encryptPassword(password));
        await storage.saveIdRole(data.id_role);

        const user: User = {
          idUser: 0, // API tidak mengembalikan idUser, set default
          id_role: data.id_role,
          name: data.name,
          email: data.email,
          username,
        };

        await storage.saveUserData(user);
        
        return user;
      }
      
      throw new Error(response.message?.[0] || 'Login failed');
    } catch (error: any) {
      throw new Error(error.message || 'Network error');
    }
  },

  async logout(): Promise<void> {
    try {
      await apiService.logout();
    } catch (error) {
      // Ignore logout API errors
    } finally {
      await storage.clearAll();
    }
  },

  async isLoggedIn(): Promise<boolean> {
    const user = await storage.getUserData();
    return user !== null;
  },
};
