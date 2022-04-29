import {MigrationInterface, QueryRunner} from "typeorm";

export class userUpdate1645175354681 implements MigrationInterface {
    name = 'userUpdate1645175354681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verified\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verified\``);
    }

}
