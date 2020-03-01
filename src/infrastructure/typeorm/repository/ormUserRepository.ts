import { Repository, Connection, QueryRunner, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository, CreateUserParam } from '@/interfaces/repositories';
import {
  User as UserModel,
  SocialAccount as SocialUserModel,
  EmailAccount as EmailUserModel,
  SocialProvider,
  SocialAccount as SocialAccountModel,
} from '../model';
import { User, SocialAccount, EmailAccount } from '@/entities';
import { AlreadyExistsAccountError } from '@/domain/auth/exception';

type BeforeInsertCheckFunc = (p: CreateUserParam) => Promise<boolean>;
type AccountInsertFunc = (userID: number, p: CreateUserParam) => Promise<void>;

@Injectable()
export class OrmUserRepository implements UserRepository {
  private readonly providerIDMap: Map<string, number>;

  constructor(
    private readonly connection: Connection,
    @InjectRepository(UserModel)
    private readonly userRepo: Repository<UserModel>,
    @InjectRepository(SocialUserModel)
    private readonly socialUserRepo: Repository<SocialUserModel>,
    @InjectRepository(EmailUserModel)
    private readonly emailUserRepo: Repository<EmailUserModel>,
    @InjectRepository(SocialProvider)
    private readonly providerRepo: Repository<SocialProvider>,
  ) {
    this.providerIDMap = new Map<string, number>();
    this.providerRepo.find().then(providers =>
      providers.forEach(provider => {
        this.providerIDMap.set(provider.name, provider.id);
      }),
    );
  }

  private getCheckAccountFuncByLoginType(type: string): BeforeInsertCheckFunc {
    const whenEmailCheckFunc = async (p: CreateUserParam) => {
      const user = await this.emailUserRepo.findOne({
        select: ['email'],
        where: { email: p.email },
      });

      return user !== undefined;
    };

    const whenSocialCheckFunc = async (p: CreateUserParam) => {
      const user = await this.socialUserRepo.findOne({
        select: ['socialUserID', 'socialProviderID'],
        where: {
          socialUserID: p.socialUserID,
          socialProviderID: this.providerIDMap.get(p.type),
        },
      });

      return user !== undefined;
    };

    return type === 'email' ? whenEmailCheckFunc : whenSocialCheckFunc;
  }

  private getInsertAccountFunc(
    type: string,
    queryRunner: QueryRunner,
  ): AccountInsertFunc {
    const insertEmailAccountFunc = async (
      userID: number,
      p: CreateUserParam,
    ) => {
      await queryRunner.manager.insert(EmailUserModel, {
        userID,
        email: p.email,
        encryptedPassword: p.encryptedPassword,
      });
    };

    const insertSocialAccountFunc = async (
      userID: number,
      p: CreateUserParam,
    ) => {
      await queryRunner.manager.insert(SocialAccountModel, {
        userID,
        socialProviderID: this.providerIDMap.get(p.type),
        socialUserID: p.socialUserID,
      });
    };

    return type === 'email' ? insertEmailAccountFunc : insertSocialAccountFunc;
  }

  async createUser(param: CreateUserParam): Promise<User> {
    const queryRunner = this.connection.createQueryRunner();
    const userProfile: Partial<UserModel> = {
      name: param.username,
      email: param.email,
      birthYear: param.birthYear,
    };

    const beforeCheckFunc = this.getCheckAccountFuncByLoginType(param.type);
    const existsAccount = await beforeCheckFunc(param);
    if (existsAccount) {
      throw new AlreadyExistsAccountError();
    }

    let createdUser: User;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const insertAccountFunc = this.getInsertAccountFunc(
        param.type,
        queryRunner,
      );

      const insertResult = await queryRunner.manager.insert(
        UserModel,
        userProfile,
      );
      const insertedUserID: number = insertResult.identifiers[0].id;
      await insertAccountFunc(insertedUserID, param);

      await queryRunner.commitTransaction();

      createdUser = {
        id: insertedUserID,
        name: param.username,
        email: param.email,
        birthYear: param.birthYear,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      await queryRunner.release();
    }

    return createdUser;
  }

  async getUserByUserID(userID: number): Promise<User | undefined> {
    const user = await this.userRepo.findOne({
      where: {
        id: userID,
      },
    });

    return user;
  }

  async getAccountByEmail(email: string): Promise<EmailAccount> {
    const account = await this.emailUserRepo.findOne({
      relations: ['user'],
      where: {
        email,
      },
    });

    return account;
  }

  async getAccountBySocial(
    socialProviderName: string,
    socialUserID: string,
  ): Promise<SocialAccount> {
    const socialProviderID = this.providerIDMap.get(socialProviderName);
    const account = await this.socialUserRepo.findOne({
      relations: ['user'],
      where: {
        socialProviderID,
        socialUserID,
      },
    });

    return account;
  }
}
