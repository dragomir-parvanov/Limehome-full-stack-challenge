import { Injectable, OnDestroy } from '@angular/core';
import { createPropertyCardFactory } from '../../../../functions/factories/property';
import { PropertyCard } from '../../../../types/interfaces/property';
import { BaseService } from '../base.service';
import { MapService } from '../map/map.service';

@Injectable()
export class PropertyCardsService extends BaseService {
  propertyCards: PropertyCard[] = [];
  constructor(private mapService: MapService) {
    super();
    this.subscriptions.push(
      this.mapService.properties.subscribe({
        next: (arr) => {
          this.propertyCards.length = 0; // emptying the array and keeping the reference
          this.propertyCards.push(...arr.map(createPropertyCardFactory));
        },
      })
    );
  }
}
