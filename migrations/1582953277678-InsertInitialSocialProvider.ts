import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertInitialSocialProvider1582953277678
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('SocialProvider')
      .values([{ name: 'google' }, { name: 'facebook' }])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
