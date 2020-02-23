import { Repository } from 'typeorm';
import { UserRepository } from '@/interfaces/repositories';
import { User, SocialUser, EmailUser } from '../model';

export class OrmUserRepository implements UserRepository {
  constructor(
    private readonly userRepo: Repository<User>,
    private readonly socialUserRepo: Repository<SocialUser>,
    private readonly emailUserRepo: Repository<EmailUser>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.emailUserRepo.findOne({
      where: {
        email,
      },
    });

    console.log(user);
    // this.userRepo.query('');
    throw new Error('Method not implemented.');
  }

  async getUserBySocial(
    socialProviderID: number,
    socialUserID: string,
  ): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
