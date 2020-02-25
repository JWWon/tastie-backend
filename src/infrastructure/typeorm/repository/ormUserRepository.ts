import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository, CreateUserParam } from '@/interfaces/repositories';
import {
  User as UserModel,
  SocialUser as SocialUserModel,
  EmailUser as EmailUserModel,
  SocialProvider,
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
    @InjectRepository(SocialProvider)
    private readonly providerRepo: Repository<SocialProvider>,
  ) {}

  async createUser(param: CreateUserParam): Promise<User> {
    const { queryRunner } = this.userRepo;
    const socialProviderID = await this.providerRepo.findOne({
      select: ['id'],
      where: {
        name: param.type,
      },
    });

    const user: Partial<UserModel> = {
      name: param.username,
      email: param.email,
    };

    await queryRunner.startTransaction();

    try {
      const insertedUser = await queryRunner.manager.insert(UserModel, user);
      const insertedUserID = insertedUser.identifiers[0];

      await queryRunner.commitTransaction();

      return {
        id: 10,
        name: param.username,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return {
      id: 10,
      name: '',
    };
  }

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
