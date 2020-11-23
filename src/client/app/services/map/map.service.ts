import { Inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, of, Observable } from 'rxjs';

import { flow, pipe } from 'fp-ts/lib/function';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { array } from 'io-ts/lib/Decoder';
import { fold } from 'fp-ts/lib/Either';
import { PropertyDoceder } from '../../../../functions/decoders/properties';
import { Property } from '../../../../types/interfaces/property';
import {
  DEFAULT_MAP_LATITUDE,
  DEFAULT_MAP_LONGITUDE,
} from '../../../constants/position';

/**
 * This is intended to be used as a singleton.
 */
@Injectable({
  providedIn: 'root',
})
export class MapService {
  currentFocusedProperty = new BehaviorSubject<string>('');
  latitude = DEFAULT_MAP_LATITUDE;
  longitude = DEFAULT_MAP_LONGITUDE;
  properties = new BehaviorSubject<Property[]>([]);
  private propertiesObservable: Observable<Property[]>;
  constructor(private http: HttpClient) {
    const at = `${this.latitude},${this.longitude}`;

    this.propertiesObservable = this.http.get(`/api/properties/at=${at}`).pipe(
      catchError((err) => {
        console.log(
          `error while retrieving the properties from the server, returning empty array`,
          err
        );
        return of([]);
      }),
      map(
        flow(
          array(PropertyDoceder).decode,
          fold(
            (err) => {
              console.log(
                'error when decoding properties, return empty array',
                err
              );
              return [];
            },
            (r) => r
          )
        )
      )
    );
  }

  init() {
    this.getAndSetProperties();
  }

  changePropertyFocus(propertyId: string) {
    this.currentFocusedProperty.next(propertyId);
  }

  private getAndSetProperties() {
    this.propertiesObservable.subscribe({
      next: (v) => this.properties.next(v),
    });
  }
}
