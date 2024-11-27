export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = typeof Roles[keyof typeof Roles]; //Para que se sugieran valores válidos al momento de crear nuevos roles