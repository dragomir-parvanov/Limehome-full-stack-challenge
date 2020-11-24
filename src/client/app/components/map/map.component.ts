import { Component, OnDestroy, OnInit } from '@angular/core';
import { PropertyMarker } from '../../../../types/interfaces/property';
import { MapService } from '../../services/map/map.service';
import { MarkersService } from '../../services/marker/markers.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MarkersService],
})
export class MapComponent {
  latitude: number;
  longitude: number;
  markers: PropertyMarker[];
  onMarkerClick: (marker: PropertyMarker) => void;
  constructor(
    private mapService: MapService,
    private markersService: MarkersService
  ) {
    this.latitude = this.mapService.latitude;
    this.longitude = this.mapService.longitude;

    this.markers = this.markersService.propertyMarkers;
    this.onMarkerClick = this.markersService.onMarkerClick;
  }
}
