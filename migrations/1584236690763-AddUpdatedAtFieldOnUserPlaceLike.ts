import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUpdatedAtFieldOnUserPlaceLike1584236690763
  implements MigrationInterface {
  name = 'AddUpdatedAtFieldOnUserPlaceLike1584236690763';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "UserPlaceLike" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "UserPlaceLike" DROP COLUMN "updatedAt"`,
      undefined,
    );
  }
}
