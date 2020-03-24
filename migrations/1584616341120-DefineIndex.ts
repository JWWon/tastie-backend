import {MigrationInterface, QueryRunner} from "typeorm";

export class DefineIndex1584616341120 implements MigrationInterface {
    name = 'DefineIndex1584616341120'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "EmailAccount" DROP CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425"`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" ADD CONSTRAINT "UQ_f3bde0d9b08969cf89ca5a63425" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "UQ_58bc4dc6374351b11d0df66d60b" UNIQUE ("user_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" ADD CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b"`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" DROP CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" DROP CONSTRAINT "UQ_58bc4dc6374351b11d0df66d60b"`, undefined);
        await queryRunner.query(`ALTER TABLE "SocialAccount" ADD CONSTRAINT "FK_58bc4dc6374351b11d0df66d60b" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" DROP CONSTRAINT "UQ_f3bde0d9b08969cf89ca5a63425"`, undefined);
        await queryRunner.query(`ALTER TABLE "EmailAccount" ADD CONSTRAINT "FK_f3bde0d9b08969cf89ca5a63425" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
