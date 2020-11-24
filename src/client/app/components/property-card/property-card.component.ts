import { Component, Input, OnInit } from '@angular/core';
import { PropertyCard } from '../../../../types/interfaces/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent implements OnInit {
  @Input() card: PropertyCard;

  constructor() {}

  ngOnInit(): void {}
}
