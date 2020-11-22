export interface Property {
  title: string;
  position: [latitude: number, longitude: number];
  /**
   * The distance is in meters
   */
  distance: number;
}
