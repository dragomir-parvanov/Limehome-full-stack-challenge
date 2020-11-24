import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { PropertyCard } from '../../../../types/interfaces/property';
import { BaseService } from '../../services/base.service';
import { PropertyCardsService } from '../../services/cards/property-cards.service';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-property-swiper',
  templateUrl: './property-swiper.component.html',
  styleUrls: ['./property-swiper.component.scss'],
  providers: [PropertyCardsService],
})
export class PropertySwiperComponent {
  cards: PropertyCard[];
  constructor(propertyCardsService: PropertyCardsService) {
    this.cards = propertyCardsService.propertyCards;
  }
}
