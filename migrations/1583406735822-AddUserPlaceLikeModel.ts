import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPlaceLikeModel1583406735822 implements MigrationInterface {
  name = 'AddUserPlaceLikeModel1583406735822';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "UserPlaceLike" ("user_id" integer NOT NULL, "place_id" character varying NOT NULL, "positive" boolean NOT NULL, CONSTRAINT "PK_38ddd72b01a415f9420258627d6" PRIMARY KEY ("user_id", "place_id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "UserPlaceLike"`, undefined);
  }
}
