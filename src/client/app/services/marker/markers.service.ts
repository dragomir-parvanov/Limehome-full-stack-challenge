import { Injectable } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { MapService } from '../map/map.service';

@Injectable({
  providedIn: MapComponent,
})
export class MarkersService {
  constructor(mapService: MapService) {}
}
