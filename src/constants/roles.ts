export const ROLES = {
  ADMIN: '1',
  SALESMAN: '2',
  NONCHANNEL: '3',
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];
