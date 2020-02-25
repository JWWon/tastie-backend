export interface Passport {
  encryptPassword(password: string): Promise<string>;
  comparedPassword(encrypted: string, password: string): Promise<boolean>;
}

export const PassportToken = Symbol();
