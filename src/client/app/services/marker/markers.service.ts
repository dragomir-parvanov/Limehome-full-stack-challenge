import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ACTIVE_MAP_MARKER_IMAGE_FILE_NAME } from '../../../../constants/design';
import { createMarkerFactory } from '../../../../functions/factories/property';
import { PropertyMarker } from '../../../../types/interfaces/property';
import { BaseService } from '../base.service';
import { MapService } from '../map/map.service';

@Injectable()
export class MarkersService extends BaseService implements OnDestroy {
  latitude: number;
  longitude: number;
  propertyMarkers: PropertyMarker[] = [];
  constructor(private mapService: MapService) {
    super();
    const { properties, currentFocusedProperty } = this.mapService;
    // I tried to bring only one subscription with the help of the 'mergeMap' operator
    // but at the end I was getting a new array which had to replace the old one and that introduced a performance problem
    // I guess angular wokrs better when dealing with mutable data structures rather than immutable.
    const propertiesSubscription = properties.subscribe({
      next: (arr) => {
        this.propertyMarkers.length = 0; // emptying the array, but keeping the reference
        this.propertyMarkers.push(
          ...arr.map(createMarkerFactory(currentFocusedProperty.getValue()))
        );
      },
    });
    const currentFocusedPropertySubscription = currentFocusedProperty.subscribe(
      {
        next: (propertyId) => {
          this.propertyMarkers.forEach((m) => {
            if (m.id === propertyId) {
              // recreating the marker with the correct values
              // here it will set the z-index to 1 and set the icon to the active one
              Object.assign(m, createMarkerFactory(propertyId)(m));
            } else if (
              m.iconFileName.endsWith(ACTIVE_MAP_MARKER_IMAGE_FILE_NAME)
            ) {
              // recreating the marker with the correct values
              // here it will set the zIndex to 0 and set the icon to the default one
              Object.assign(m, createMarkerFactory(propertyId)(m));
            }
          });
        },
      }
    );
    this.subscriptions.push(
      propertiesSubscription,
      currentFocusedPropertySubscription
    );
  }
  onMarkerClick(marker: PropertyMarker) {
    this.mapService.currentFocusedProperty.next(marker.id);
  }
}
