import {MigrationInterface, QueryRunner} from "typeorm";

export class DefineIndex1584589919217 implements MigrationInterface {
    name = 'DefineIndex1584589919217'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "EmailAccount" DROP CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425"`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" ADD CONSTRAINT "UQ_f3bde0d9b08969cf89ca5a63425" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58a660a0f873bdc10d17e8cc2f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "UQ_53ba44d34590bac5575fd9bdb1d"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "UQ_58bc4dc6374351b11d0df66d60b" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "UQ_58a660a0f873bdc10d17e8cc2f3" UNIQUE ("social_provider_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "UQ_53ba44d34590bac5575fd9bdb1d" UNIQUE ("social_user_id", "social_provider_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" ADD CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58a660a0f873bdc10d17e8cc2f3" FOREIGN KEY ("social_provider_id") REFERENCES "SocialProvider"("social_provider_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58a660a0f873bdc10d17e8cc2f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b"`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" DROP CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "UQ_53ba44d34590bac5575fd9bdb1d"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "UQ_58a660a0f873bdc10d17e8cc2f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "UQ_58bc4dc6374351b11d0df66d60b"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "UQ_53ba44d34590bac5575fd9bdb1d" UNIQUE ("social_user_id", "social_provider_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58a660a0f873bdc10d17e8cc2f3" FOREIGN KEY ("social_provider_id") REFERENCES "SocialProvider"("social_provider_id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" DROP CONSTRAINT "UQ_f3bde0d9b08969cf89ca5a63425"`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" ADD CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
