export const API_CONFIG = {
  BASE_URL: 'https://sc-test.menara-agung.com/pmo/api/',
  TIMEOUT: 30000,
  BASIC_AUTH_USER: 'webservice',
  BASIC_AUTH_PASS: 'Honda2020~',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: '@access_token',
  SESSION_ID: '@session_id',
  USER_ID: '@user_id',
  PASSWORD: '@password_encrypted',
  ID_ROLE: '@id_role',
  FCM_ID: '@fcm_id',
  USER_DATA: '@user_data',
} as const;

export const API_RESPONSE = {
  SUCCESS: 1,
  ERROR: 0,
} as const;

export const ROLES = {
  ADMIN: '1',
  SALESMAN: '2',
  NONCHANNEL: '3',
  DEALER: '4',
} as const;

export const isNonChannel = (roleId: string | undefined): boolean => {
  return roleId === ROLES.NONCHANNEL;
};
