import { Injectable } from '@angular/core';
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
  constructor(
    private http: HttpClient,
    public currentFocusedProperty = new Subject<string>(),
    public properties = new BehaviorSubject<Property[]>([]),
    public mapLatitude = DEFAULT_MAP_LATITUDE,
    public mapLongitude = DEFAULT_MAP_LONGITUDE
  ) {}

  init() {}
  changePropertyFocus(propertyId: string) {
    this.currentFocusedProperty.next(propertyId);
  }
}
