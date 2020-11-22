import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PropertyEntity from './property.entity';

@Entity('booking')
export default class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => PropertyEntity, (property) => property.bookings)
  property: PropertyEntity;

  @Column({ type: 'date' })
  from: Date;
  @Column({ type: 'date' })
  to: Date;
}
