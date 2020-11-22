import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import BookingEntity from './booking.entity';

@Entity('property')
export default class PropertyEntity {
  /**
   * This should be the id that is coming from the 'Here' API
   * We need to set this manually
   */
  @PrimaryColumn()
  id: string;

  @OneToMany((type) => BookingEntity, (booking) => booking.property)
  bookings: BookingEntity[];
}
