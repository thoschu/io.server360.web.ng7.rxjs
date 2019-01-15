import {Component, OnInit, OnDestroy} from '@angular/core';

import {BehaviorSubject, Observable, Observer, ReplaySubject, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'psx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = 'rxjs-app';
  private _observable$: Observable<any>;
  private _subscription: Subscription;
  private _subject$: Subject<number>;
  private _bsubject$: BehaviorSubject<any>;
  private _rsubject$: ReplaySubject<any>;

  constructor() {
    this._observable$ = Observable.create((observer: Observer<string>) => {
      try {
        observer.next('A');
        observer.next('B');
        observer.next('C');
        setTimeout(() => {
          observer.next('Z');
          observer.complete();
        }, 3000);
      } catch (err) {
        observer.error(err); // delivers an error if it caught one
      }
    });

    this._subject$ = new Subject();
    this._subject$.subscribe(value => console.log('_subject$.subscribe 1', value));
    this._subject$.next(1);

    this._bsubject$ = new BehaviorSubject(13);
    this._bsubject$.next(1);
    this._bsubject$.next('2');
    this._bsubject$.subscribe(value => console.log('_bsubject$.subscribe 1', value));
    this._bsubject$.next('3');

    this._rsubject$ = new ReplaySubject();
    this._rsubject$.next(1);
    this._rsubject$.next('2');
    this._rsubject$.subscribe(value => console.log('_rsubject$.subscribe 1', value));
    this._rsubject$.next('3');
  }

  ngOnInit(): void {
    this._subscription = this._observable$.subscribe({
      next: value => console.log('got value ' + value),
      error: err => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done')
    });

    this._subject$.next(2);
    this._subject$.next(3);
    this._subject$.subscribe(value => console.log('_subject$.subscribe  2', value));
    this._subject$.next(4);
    this._subject$.complete();
    this._subject$.subscribe(value => console.log('_subject$.subscribe   3', value));
    this._subject$.next(5);

    this._bsubject$.next(4);
    this._bsubject$.next(6);
    this._bsubject$.next(7);
    this._bsubject$.next(8);
    this._bsubject$.subscribe(value => console.log('_bsubject$.subscribe  2', value));
    this._bsubject$.next(9);
    this._bsubject$.subscribe(value => console.log('_bsubject$.subscribe   3', value));

    this._rsubject$.next(4);
    this._rsubject$.next(6);
    this._rsubject$.next(7);
    this._rsubject$.next(8);
    this._rsubject$.subscribe(value => console.log('_rsubject$.subscribe  2', value));
    this._rsubject$.next(9);
    this._rsubject$.subscribe(value => console.log('_rsubject$.subscribe   3', value));
    this._rsubject$.next(10);
  }

  ngOnDestroy(): void {
    console.error('avoid memory leaks');
    this._subscription.unsubscribe();
    this._subject$.unsubscribe();
    this._bsubject$.unsubscribe();
    this._rsubject$.unsubscribe();
  }
}
