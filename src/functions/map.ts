/**
 * Transfers a distance to a distance preview
 *
 * @param distance distance in meters.
 * @example
 * '3.4 KM'
 * '700 M'
 */
export const getDistancePreview = (distance: number): string => {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)} KM`;
  } else {
    return `${distance.toFixed(0)} M`;
  }
};
