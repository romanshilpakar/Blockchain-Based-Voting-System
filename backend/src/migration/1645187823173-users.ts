import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from "../entity/User";
import usersData from "../seed/users";

export class users1645187823173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = User.create(usersData);
    await User.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
