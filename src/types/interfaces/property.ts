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

export interface PropertyCard extends Property {
  price: number;

  /**
   * The distance preview
   *
   * @example
   * 3.4 KM
   * 700 M
   */
  distancePreview: string;

  imageSrc: string;
}
