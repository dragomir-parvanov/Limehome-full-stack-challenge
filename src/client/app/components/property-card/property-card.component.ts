import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { PropertyCard } from '../../../../types/interfaces/property';
import { MapService } from '../../services/map/map.service';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss'],
})
export class PropertyCardComponent implements AfterViewInit, OnDestroy {
  @Input() card: PropertyCard;

  observer = new IntersectionObserver(
    ([r]) => {
      if (r.intersectionRect.width > 270 / 2) {
        if (
          this.card.id === this.mapService.currentFocusedProperty.getValue()
        ) {
          return;
        }
        // if the intersection rect is half of the width of the emelement, that means we should focus it
        this.mapService.currentFocusedProperty.next(this.card.id);
      }
    },
    { threshold: 1 }
  );

  constructor(private mapService: MapService) {}
  ngAfterViewInit() {
    const {
      card: { id },
    } = this;
    // not really proud of that.
    const doc = document.getElementById(id);
    if (!doc) {
      throw new Error(`There should be card with id ${id}`);
    }
    this.observer.observe(doc);
  }
  ngOnDestroy() {
    this.observer.disconnect();
  }
}
