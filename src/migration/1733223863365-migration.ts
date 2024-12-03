import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1733223863365 implements MigrationInterface {
    name = 'Migration1733223863365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenant_credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "host" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "user" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "PK_7588d1bcbc3c77d162b820e963e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "tenantCredentialsId" uuid, CONSTRAINT "REL_4902378c377fbcb7ebc6bb3079" UNIQUE ("tenantCredentialsId"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_4902378c377fbcb7ebc6bb30790" FOREIGN KEY ("tenantCredentialsId") REFERENCES "tenant_credentials"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_4902378c377fbcb7ebc6bb30790"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TABLE "tenant_credentials"`);
    }

}
