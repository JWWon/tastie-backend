import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/interfaces/repositories';
import {
  User as UserModel,
  SocialUser as SocialUserModel,
  EmailUser as EmailUserModel,
} from '../model';
import { User, SocialUser, EmailUser } from '@/entities';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<User>,
    @InjectRepository(SocialUserModel)
    private readonly socialUserRepo: Repository<SocialUser>,
    @InjectRepository(EmailUserModel)
    private readonly emailUserRepo: Repository<EmailUser>,
  ) {}

  async getUserByEmail(email: string): Promise<EmailUser> {
    const user = await this.emailUserRepo.findOne({
      relations: ['user'],
      where: {
        email,
      },
    });

    return user;
  }

  async getUserBySocial(
    socialProviderID: number,
    socialUserID: string,
  ): Promise<SocialUser> {
    throw new Error('Method not implemented.');
  }
}
