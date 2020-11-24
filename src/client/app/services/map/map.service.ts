import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { flow } from 'fp-ts/lib/function';
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
  latitude = DEFAULT_MAP_LATITUDE;
  longitude = DEFAULT_MAP_LONGITUDE;
  currentFocusedProperty = new BehaviorSubject<string>('');
  properties = new BehaviorSubject<Property[]>([]);

  private propertiesObservable: Observable<Property[]>;
  constructor(http: HttpClient) {
    const at = `${this.latitude},${this.longitude}`;

    this.propertiesObservable = http.get(`/api/properties/at=${at}`).pipe(
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

  /**
   * When this gets called it performs the network fetching.
   */
  init() {
    this.getAndSetProperties();
  }

  private getAndSetProperties() {
    this.propertiesObservable.subscribe({
      next: (v) => this.properties.next(v),
    });
  }
}
