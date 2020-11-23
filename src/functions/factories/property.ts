import {
  ACTIVE_MAP_MARKER_IMAGE_FILE_NAME,
  DEFAULT_MAP_MARKER_IMAGE_FILE_NAME,
} from '../../constants/design';
import { Property, PropertyMarker } from '../../types/interfaces/property';

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

  return { ...property, iconFileName, zIndex };
};
