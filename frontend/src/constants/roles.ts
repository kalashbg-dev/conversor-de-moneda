export const Roles = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const;

export type Role = typeof Roles[keyof typeof Roles];