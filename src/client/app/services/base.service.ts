import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class BaseService implements OnDestroy {
  subscriptions: Subscription[] = [];
  constructor() {}

  ngOnDestroy() {
    this.subscriptions.forEach((s) => !s.closed && s.unsubscribe());
  }
}
