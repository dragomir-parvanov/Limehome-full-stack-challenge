import {
  ACTIVE_MAP_MARKER_IMAGE_FILE_NAME,
  DEFAULT_MAP_MARKER_IMAGE_FILE_NAME,
} from '../../constants/design';
import {
  Property,
  PropertyCard,
  PropertyMarker,
} from '../../types/interfaces/property';
import { getDistancePreview } from '../map';

/**
 * High order function for creating a property marker for a Property
 * The icon is being set from constants.
 *
 * @param selectedPropertyId
 */
export const createMarkerFactory = (selectedPropertyId: string) => (
  property: Property
): PropertyMarker => {
  const isSelected = property.id === selectedPropertyId;
  const iconFileName = isSelected
    ? ACTIVE_MAP_MARKER_IMAGE_FILE_NAME
    : DEFAULT_MAP_MARKER_IMAGE_FILE_NAME;
  const zIndex = isSelected ? 1 : 0;
  console.log('creating');
  return { ...property, iconFileName, zIndex };
};

export const createPropertyCardFactory = (
  property: Property
): PropertyCard => ({
  ...property,
  price: parseFloat(Math.random().toFixed(2)),
  distancePreview: getDistancePreview(property.distance),
  imageSrc:
    'https://thumbs.dreamstime.com/z/living-room-interior-design-portrait-24141228.jpg', // currently hard coded
});
