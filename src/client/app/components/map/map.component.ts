import { Component, OnDestroy, OnInit } from '@angular/core';
import { PropertyMarker } from '../../../../types/interfaces/property';
import { MapService } from '../../services/map/map.service';
import { MarkersService } from '../../services/marker/markers.service';
import BasePageComponent from '../base.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MarkersService],
})
export class MapComponent extends BasePageComponent implements OnInit {
  latitude: number;
  longitude: number;
  markers: PropertyMarker[];
  onMarkerClick: (marker: PropertyMarker) => void;
  constructor(
    private mapService: MapService,
    private markersService: MarkersService
  ) {
    super();
    this.markers = this.markersService.propertyMarkers;
    this.onMarkerClick = this.markersService.onMarkerClick;
  }
  ngOnInit() {
    this.subscriptions.push(
      this.mapService.position.subscribe({
        next: ({ latitude, longitude }) => {
          console.log('setting stuff', latitude, longitude);
          this.latitude = latitude;
          this.longitude = longitude;
        },
      })
    );
  }
}
