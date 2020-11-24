import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class BaseService implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  constructor() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s) => !s.closed && s.unsubscribe());
  }
}
