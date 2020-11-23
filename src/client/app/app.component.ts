import { Component, OnInit } from '@angular/core';
import { MapService } from './services/map/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.init();
  }
}
