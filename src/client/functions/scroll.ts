import { fromEvent } from 'rxjs';
import { debounceTime, first, mapTo } from 'rxjs/operators';

export const scrollToElementRef = (
  element: HTMLElement,
  options?: ScrollIntoViewOptions,
  emitFinish = false
): Promise<boolean> => {
  element.scrollIntoView(options);
  if (emitFinish) {
    return fromEvent(window, 'scroll')
      .pipe(debounceTime(100), first(), mapTo(true))
      .toPromise();
  } else {
    return Promise.resolve(false);
  }
};
