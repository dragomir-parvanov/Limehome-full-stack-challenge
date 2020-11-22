export interface CreateBookingInput {
  /**
   * Must be the id of the 'HERE' api property
   */
  propertyId: string;
  /**
   * milliseconds since epoch- new Date().getTime()
   */
  from: number;
  /**
   * milliseconds since epoch- new Date().getTime()
   * this must be bigger than the 'from' property
   */
  to: number;
}
