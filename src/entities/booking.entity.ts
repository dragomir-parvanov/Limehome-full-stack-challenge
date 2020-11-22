import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import PropertyEntity from './property.entity';

@Entity('booking')
export default class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => PropertyEntity, (property) => property.bookings)
  property: PropertyEntity;

  @Column({ type: 'timestamp' })
  from: Date;

  @Column({ type: 'timestamp' })
  to: Date;
}
