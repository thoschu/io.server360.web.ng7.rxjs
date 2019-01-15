import {Component, OnInit, OnDestroy} from '@angular/core';

import {Observable, Observer, Subscription} from 'rxjs';

@Component({
  selector: 'psx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'rxjs-app';
  private _observable$: Observable<any>;
  private _subscription: Subscription;

  constructor() {
    this._observable$ = Observable.create((observer: Observer<number>) => {
      try {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        setTimeout(() => {
          observer.next(4);
          observer.complete();
        }, 3000);
      } catch (err) {
        observer.error(err); // delivers an error if it caught one
      }
    });
  }

  ngOnInit(): void {
    this._subscription = this._observable$.subscribe({
      next: x => console.log('got value ' + x),
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done')
    });
  }

  ngOnDestroy(): void {
    console.error('avoid memory leaks');
    this._subscription.unsubscribe();
  }
}
