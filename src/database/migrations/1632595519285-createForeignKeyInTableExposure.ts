import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createForeignKeyInTableExposure1632595519285
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'exposure',
      new TableForeignKey({
        name: 'thematicExposure',
        columnNames: ['thematic_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'thematic',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('exposure', 'thematicExposure');
  }
}
