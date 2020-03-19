import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1584616241345 implements MigrationInterface {
  name = 'InitialMigration1584616241345';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "UserProfile" ("user_id" SERIAL NOT NULL, "username" character varying(20) NOT NULL, "email" character varying(320) NOT NULL, "birth_year" smallint, CONSTRAINT "PK_c6bd96e77fbd365177ec4da1a3d" PRIMARY KEY ("user_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "EmailAccount" ("user_id" integer NOT NULL, "email" character varying NOT NULL, "encrypted_password" character varying(62) NOT NULL, CONSTRAINT "UQ_5dcb71a733fd4d798e448742ba9" UNIQUE ("email"), CONSTRAINT "REL_f3bde0d9b08969cf89ca5a6342" UNIQUE ("user_id"), CONSTRAINT "PK_f3bde0d9b08969cf89ca5a63425" PRIMARY KEY ("user_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "SocialProvider" ("social_provider_id" SERIAL NOT NULL, "provider_name" character varying NOT NULL, CONSTRAINT "UQ_f3fe3361e3733768e9fe04031d0" UNIQUE ("provider_name"), CONSTRAINT "PK_c73af4e192ad35a4ccb717f55fd" PRIMARY KEY ("social_provider_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "SocialAccount" ("user_id" integer NOT NULL, "social_user_id" character varying NOT NULL, "social_provider_id" integer NOT NULL, CONSTRAINT "UQ_53ba44d34590bac5575fd9bdb1d" UNIQUE ("social_user_id", "social_provider_id"), CONSTRAINT "REL_58bc4dc6374351b11d0df66d60" UNIQUE ("user_id"), CONSTRAINT "PK_58bc4dc6374351b11d0df66d60b" PRIMARY KEY ("user_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "UserPlaceLike" ("user_id" integer NOT NULL, "place_id" character varying NOT NULL, "positive" boolean NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_38ddd72b01a415f9420258627d6" PRIMARY KEY ("user_id", "place_id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "EmailAccount" ADD CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58a660a0f873bdc10d17e8cc2f3" FOREIGN KEY ("social_provider_id") REFERENCES "SocialProvider"("social_provider_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58a660a0f873bdc10d17e8cc2f3"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "EmailAccount" DROP CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "UserPlaceLike"`, undefined);
    await queryRunner.query(`DROP TABLE "SocialAccount"`, undefined);
    await queryRunner.query(`DROP TABLE "SocialProvider"`, undefined);
    await queryRunner.query(`DROP TABLE "EmailAccount"`, undefined);
    await queryRunner.query(`DROP TABLE "UserProfile"`, undefined);
  }
}
