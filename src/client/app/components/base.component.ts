import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: '',
})
export default abstract class BasePageComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];
  ngOnDestroy() {
    this.defaultOnDestroy();
    this.onDestroy?.();
  }

  /**
   * It was going to helpful if we can define optional abstract properties
   * https://github.com/microsoft/TypeScript/issues/641
   */
  protected onDestroy?(): void;

  private defaultOnDestroy() {
    this.subscriptions.forEach((s) => s.closed && s.unsubscribe());
  }
}
