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
            name: 'voterId',
            type: 'varchar',
          },
          {
            name: 'candidateIdPresident',
            type: 'varchar',
          },
          {
            name: 'candidateIdVicePresident',
            type: 'varchar',
          },
          {
            name: 'confirmationStatus',
            type: 'boolean',
            default: false,
          },
          {
            name: 'otpEntry',
            type: 'varchar',
            isNullable: true,
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
