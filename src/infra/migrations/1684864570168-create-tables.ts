import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAccountTable2684863270168 implements MigrationInterface {
  name = 'create_account_table2684863270168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "email" character varying(70) NOT NULL,
        "password" character varying(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP`,
    );

    await queryRunner.query(
      `CREATE TABLE "movies" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying(100) NOT NULL,
        "duration" character varying(255) NOT NULL,
        "release_date" TIMESTAMP NOT NULL,
        "description" character varying(100) NOT NULL,
        "gender" character varying(100) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TABLE "movies"`);
  }
}
