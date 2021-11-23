import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Exposure from './Exposure';

@Entity('thematic')
class Thematic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Exposure, exposure => exposure.thematic)
  exposure: Exposure[];
}

export default Thematic;
