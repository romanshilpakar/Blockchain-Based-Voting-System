import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1645167790939 implements MigrationInterface {
    name = 'initial1645167790939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`candidate\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`pollId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`poll\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`citizenshipNumber\` varchar(255) NOT NULL, \`email\` varchar(180) NOT NULL, \`password\` varchar(255) NOT NULL, \`admin\` tinyint NOT NULL, UNIQUE INDEX \`IDX_5cccbf6f2ad61b287544ddf45d\` (\`citizenshipNumber\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`candidate\` ADD CONSTRAINT \`FK_01e0d963db31f953b94d0446e17\` FOREIGN KEY (\`pollId\`) REFERENCES \`poll\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`candidate\` DROP FOREIGN KEY \`FK_01e0d963db31f953b94d0446e17\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_5cccbf6f2ad61b287544ddf45d\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`poll\``);
        await queryRunner.query(`DROP TABLE \`candidate\``);
    }

}
