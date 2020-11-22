import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Property } from '../../../types/interfaces/property';
import {
  DEFAULT_MAP_LATITUDE,
  DEFAULT_MAP_LONGITUDE,
} from '../../constants/position';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentFocusedProperty = new Subject<string>();
  mapLatitude = DEFAULT_MAP_LATITUDE;
  mapLongitude = DEFAULT_MAP_LONGITUDE;
  properties = new BehaviorSubject<Property[]>([]);
  constructor(private http: HttpClient) {}

  init() {}
  changePropertyFocus(propertyId: string) {
    this.currentFocusedProperty.next(propertyId);
  }
}
