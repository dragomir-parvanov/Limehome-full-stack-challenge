import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { PropertyCard } from '../../../../types/interfaces/property';
import { BaseService } from '../../services/base.service';
import { PropertyCardsService } from '../../services/cards/property-cards.service';
import { MapService } from '../../services/map/map.service';
import BasePageComponent from '../base.component';

@Component({
  selector: 'app-property-swiper',
  templateUrl: './property-swiper.component.html',
  styleUrls: ['./property-swiper.component.scss'],
  providers: [PropertyCardsService],
})
export class PropertySwiperComponent
  extends BasePageComponent
  implements OnInit {
  cards: PropertyCard[];
  focusedPropertyId: string;
  constructor(
    propertyCardsService: PropertyCardsService,
    private mapService: MapService
  ) {
    super();
    this.cards = propertyCardsService.propertyCards;
  }

  ngOnInit() {
    this.subscriptions.push(
      this.mapService.currentFocusedProperty.subscribe({
        next: (id) => (this.focusedPropertyId = id),
      })
    );
  }
}
