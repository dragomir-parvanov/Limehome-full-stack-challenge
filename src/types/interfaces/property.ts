export interface Property {
  /**
   * From the 'Here' API.
   */
  id: string;
  title: string;
  position: [latitude: number, longitude: number];
  /**
   * The distance is in meters
   */
  distance: number;
}

export interface PropertyMarker extends Property {
  iconFileName: string;
  zIndex: number;
}
