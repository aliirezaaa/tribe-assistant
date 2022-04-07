import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @classdesc
 * This class defines AnalyzedPost entity object for interacting with the database
 */

//TODO: add all of params
@Entity()
export class AnalyzedPost {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @Column({ type: 'varchar', length: 120 })
  public spaceId: string;

  @Column({ type: 'varchar', length: 120 })
  public spaceName: string;

  @Column({ type: 'varchar', length: 120 })
  public webhookEventId: string;

  @Column({ type: 'varchar', length: 5000 })
  public content: string;

  @Column({ type: 'varchar', length: 120 })
  public authorName: string;

  @Column({ type: 'varchar', length: 120 })
  public authorEmail: string;

  @Column({ type: 'varchar', length: 120 })
  public category: string;

  @Column('decimal', { precision: 5, scale: 2 })
  public categoryScore: number;

  @Column({ type: 'varchar', length: 120 })
  public sentiment: string;

  @Column('decimal', { precision: 5, scale: 2 })
  public sentimentScore: number;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  /**
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
