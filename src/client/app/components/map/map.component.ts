import { Component, OnDestroy, OnInit } from '@angular/core';
import { PropertyMarker } from '../../../../types/interfaces/property';
import { SubscriptionLike } from 'rxjs';
import { createMarkerFactory } from '../../../../functions/factories/property';
import {
  ACTIVE_MAP_MARKER_IMAGE_FILE_NAME,
  DEFAULT_MAP_MARKER_IMAGE_FILE_NAME,
} from '../../../../constants/design';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  latitude: number;
  longitude: number;
  propertyMarkers: PropertyMarker[] = [];
  /**
   * Used for destroying
   *
   * @private
   * @memberof MapComponent
   */
  private subscriptions: SubscriptionLike[];
  constructor(public mapService: MapService) {}
  handleMarkerClick(marker: PropertyMarker) {
    this.mapService.currentFocusedProperty.next(marker.id);
  }
  ngOnInit(): void {
    const { properties, currentFocusedProperty } = this.mapService;
    // I tried to bring only one subscription with the help of the 'mergeMap' operator
    // but at the end I was getting a new array which had to replace the old one and that introduced some rendering flickering
    // I guess angular wokrs better when dealing with mutable data structures rather than immutable.
    const propertiesSubscription = properties.subscribe({
      next: (arr) =>
        (this.propertyMarkers = arr.map(
          createMarkerFactory(currentFocusedProperty.getValue())
        )),
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
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
