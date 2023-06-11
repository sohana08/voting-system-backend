import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

export class CreateVotesTable1686523090357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'votes',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'voter_id',
            type: 'varchar',
          },
          {
            name: 'candidate_id_president',
            type: 'varchar',
          },
          {
            name: 'candidate_id_vice_president',
            type: 'varchar',
          },
          {
            name: 'confirmation_status',
            type: 'boolean',
            default: false,
          },
          {
            name: 'otp_entry',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('votes');
  }
}
