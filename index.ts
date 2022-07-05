console.clear();
import { fromEvent, BehaviorSubject, interval, merge } from 'rxjs';
import { switchMap, map, share } from 'rxjs/operators';

const upToDate$ = new BehaviorSubject<boolean>(true);

const hasChanges$ = merge(upToDate$.pipe(
  switchMap(_ => interval(10000)),
  map(interval => console.log(`${interval}`)),
  share()),
  upToDate$.pipe(map((_) => false))
  );

fromEvent(document, 'click').subscribe(_ =>
  upToDate$.next(true)
);

hasChanges$.subscribe(_ => console.log(`1 subscription`));
hasChanges$.subscribe(_ => console.log(`2 subscription`));
hasChanges$.subscribe(_ => console.log(`3 subscription`));