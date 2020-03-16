import * as bcrypt from 'bcryptjs';
import { Passport } from '@/domain/auth';

export class BcryptPassport implements Passport {
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async comparedPassword(
    encrypted: string,
    password: string,
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, encrypted);
    return result;
  }
}
