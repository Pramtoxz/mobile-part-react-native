import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, STORAGE_KEYS } from './constants';


interface APIResponse<T = any> {
  status: number;
  message: string[];
  data?: T;
}

interface LoginRequest {
  email: string;
  password: string;
  regid: string;
}

interface LoginResponse {
  session_id: string;
  id_role: string;
  name: string;
  email: string;
}

interface OAuthTokenResponse {
  token: string;
}

interface CheckInStatus {
  is_checked_in: boolean;
  dealer_name?: string;
  checkin_time?: string;
  code_visit?: string;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
}

class APIService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired - clear storage
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACCESS_TOKEN,
            STORAGE_KEYS.SESSION_ID,
            STORAGE_KEYS.USER_DATA,
          ]);
        }
        return Promise.reject(error);
      }
    );
  }


  private createFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  }

  private async handleResponse<T>(promise: Promise<any>): Promise<APIResponse<T>> {
    try {
      const response = await promise;
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw {
        status: 0,
        message: ['Network error. Please check your connection.'],
      };
    }
  }

  async getOAuthToken(): Promise<APIResponse<OAuthTokenResponse>> {
    return this.handleResponse(
      this.api.post('oauth/token', null, {
        auth: {
          username: API_CONFIG.BASIC_AUTH_USER, // webservice
          password: API_CONFIG.BASIC_AUTH_PASS, // Honda2020~
        },
      })
    );
  }

  /**
   * Login with username and password
   */
  async login(request: LoginRequest): Promise<APIResponse<LoginResponse>> {
    const formData = this.createFormData(request);
    return this.handleResponse(this.api.post('auth/login', formData));
  }


  async logout(): Promise<APIResponse> {
    return this.handleResponse(this.api.post('auth/logout'));
  }

  async forgotPassword(email: string): Promise<APIResponse> {
    const formData = this.createFormData({ email });
    return this.handleResponse(this.api.post('auth/forgot-password', formData));
  }

  async renewToken(password: string): Promise<APIResponse<OAuthTokenResponse>> {
    const formData = this.createFormData({ password });
    return this.handleResponse(this.api.post('oauth/renew', formData));
  }

  async getHome(): Promise<APIResponse> {
    return this.handleResponse(this.api.get('home'));
  }

 
  async getDashboard(params: {
    category: string;
    month: string;
    year: string;
    ms_dealer_id: string;
  }): Promise<APIResponse> {
    const formData = this.createFormData(params);
    return this.handleResponse(this.api.post('dashboard/index', formData));
  }

  async checkCheckinStatus(): Promise<APIResponse<CheckInStatus>> {
    return this.handleResponse(this.api.post('sales/check-checkin'));
  }

  async checkout(codeVisit: string): Promise<APIResponse> {
    const formData = this.createFormData({ code_visit: codeVisit });
    return this.handleResponse(this.api.post('sales/checkin-checkout', formData));
  }

  async getLeaderboard(): Promise<APIResponse> {
    return this.handleResponse(this.api.get('leaderboard'));
  }


  async getProfile(): Promise<APIResponse<UserProfile>> {
    return this.handleResponse(this.api.post('profile/profile'));
  }


  async changePassword(password: string): Promise<APIResponse> {
    const formData = this.createFormData({ password });
    return this.handleResponse(this.api.post('profile/change-password', formData));
  }


  async getNotifications(page: number = 1): Promise<APIResponse> {
    const formData = this.createFormData({ page });
    return this.handleResponse(this.api.post('dashboard/notice', formData));
  }


  async getCatalogue(): Promise<APIResponse> {
    return this.handleResponse(this.api.get('catalog/catalog'));
  }


  async getBrosurPromo(page: number = 1): Promise<APIResponse> {
    return this.handleResponse(this.api.get('promo/brosure-promo', { params: { page } }));
  }

  
  async getPartPromo(page: number = 1): Promise<APIResponse> {
    return this.handleResponse(this.api.get('promo/part-promo', { params: { page } }));
  }
}

export const apiService = new APIService();
export default apiService;
