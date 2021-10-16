import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable} from 'rxjs';
import {skip, startWith, switchMap} from 'rxjs/operators';

import {InitialData} from '../models/initial-data';
import {Upgrade} from '../models/upgrade';
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
  clickValue = 1;

  constructor(
    private apiService: ApiService,
  ) {};

  init(data: InitialData): void {
    const companyPerformace = data.currentWorkers.map(
      currentWorkersRow => {
        const currentWorkerInfo = data.workersInfo.find(workerInfo => workerInfo.id === currentWorkersRow.workerId);

        return currentWorkersRow.workerCount * (currentWorkerInfo?.performance ?? 0);
      }
    )
    .reduce((a, b) => a + b, 0);

    this.accumulatorState.next(companyPerformace);

    this.walletState.next(data.wallet);
    this.overallState.next(data.overallTasks);

    this.workStream = interval(10000).pipe(
      startWith(0),
    );
    this.workStream.pipe(
      skip(1),
      switchMap(_ => this.apiService.sendCompletedTasks(this.manualClicks))
    )
    .subscribe(() => {
      this.manualClicks = 0;
      this.addClicks(this.accumulatorState.value, false);
    });
  }

  addClicks(numberOfClicks = this.clickValue, isManual = true): void {
    this.walletState.next(this.walletState.value + numberOfClicks)
    this.overallState.next(this.overallState.value + numberOfClicks)

    if (isManual) {
      this.manualClicks += 1;
    }
  }

  buySome(workerToBuy: Worker): void {
    this.walletState.next(this.walletState.value - workerToBuy.price);
    this.accumulatorState.next(this.accumulatorState.value + workerToBuy.performance);
  }

  buyUpgrade(upgradeToBuy: Upgrade): void {
    this.clickValue = upgradeToBuy.performance;
  }
}
