import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Thematic from './Thematic';

@Entity('exposure')
class Exposure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  description: string;

  @Column()
  urlImage: string;

  @Column()
  thematic_id: string;

  @ManyToOne(() => Thematic, thematic => thematic.exposure)
  @JoinColumn({ name: 'thematic_id' })
  thematic: Thematic;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Exposure;
// @ManyToOne(() => Category)
// @JoinColumn({ name: 'category_id' })
// category: Category;
