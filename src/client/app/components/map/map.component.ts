import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  latitude: number;
  longitude: number;
  constructor(private mapService: MapService) {
    this.latitude = this.mapService.mapLatitude;
    this.longitude = this.mapService.mapLongitude;
  }

  ngOnInit(): void {}
}
