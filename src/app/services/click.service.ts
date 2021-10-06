import {registerLocaleData} from '@angular/common';
import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

import {InitialData} from '../models/initial-data';
import {Worker} from '../models/worker';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ClickService {
  walletState = new BehaviorSubject<number>(0);
  overallState = new BehaviorSubject<number>(0);
  accumulatorState = new BehaviorSubject<number>(0);
  manualClicks = 0;
  workStream!: Observable<number>;

  constructor(
    private apiService: ApiService,
  ) {};

  init(data: InitialData): void {
    this.walletState.next(data.wallet);
    this.overallState.next(data.overallTasks);

    this.workStream = interval(10000).pipe(startWith(0));
    this.workStream.pipe(
      switchMap(_ => this.apiService.sendCompletedTasks(this.manualClicks))
    )
    .subscribe(() => {
      this.manualClicks = 0;
      this.addClicks(this.accumulatorState.value);
    });
  }

  addClicks(numberOfClicks: number = 1): void {
    this.walletState.next(this.walletState.value + numberOfClicks)
    this.overallState.next(this.overallState.value + numberOfClicks)
    this.manualClicks += numberOfClicks;
  }

  buySome(workerToBuy: Worker): void {
    this.walletState.next(this.walletState.value - workerToBuy.price);
    this.accumulatorState.next(this.accumulatorState.value + workerToBuy.performance);
  }
}
