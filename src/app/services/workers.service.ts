import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CurrentWorkersState} from '../models/current-workers-state';
import {InitialData} from '../models/initial-data';
import {NewWorkerState} from '../models/new-worker-state';
import {Worker} from '../models/worker';
import {ClickService} from './click.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  static workersLifetime = 60000;

  workersList!: ReadonlyArray<Worker>;
  currentWorkers!: BehaviorSubject<ReadonlyArray<CurrentWorkersState>>;
  mapCounter!: Observable<Map<number,number>>;

  constructor(
    private clickService: ClickService,
  ) { }

  init(data: InitialData) {
    this.workersList = data.workersInfo.map(Worker.fromJson);
    this.currentWorkers = new BehaviorSubject(data.currentWorkers);
    this.mapCounter = this.currentWorkers.pipe(
      map(currentWorkers => {
        const countMap = new Map(this.workersList.map(i => [i.id, 0]));
        currentWorkers.forEach((currentWorker) => {
          countMap.set(currentWorker.workerId, (countMap.get(currentWorker.workerId) ?? 0) + 1);
        });

        return countMap;
      })
    );

    this.clickService.expiredWorkers.subscribe((expiredWorkers) => {
      let updatedList = this.currentWorkers.value;

      expiredWorkers?.forEach((expiredWorker) => {
        let deletedPerformance = 0;

        updatedList = updatedList.filter((state) => {
          if (
            state.workerId !== expiredWorker.workerId ||
            state.id !== expiredWorker.id
          ) {
            return true;
          }

          deletedPerformance -= this.getWorkerById(state.workerId)?.performance ?? 0;

          return false;
        });

        this.clickService.updateAccumulatorValue(deletedPerformance);
      });

      this.currentWorkers.next(updatedList);
    })
  }

  buyWorker(newWorker: NewWorkerState): void {
    const workerToBuy = this.getWorkerById(newWorker.workerId);

    if (!workerToBuy) {
      return;
    }

    this.currentWorkers.next([
      ...this.currentWorkers.value,
      {
        id: newWorker.id,
        workerId: newWorker.workerId,
        workerEndTime: new Date(newWorker.endTime),
        progressValue: 100,
      },
    ]);
    this.clickService.buySome(workerToBuy);
  }

  getWorkerById(workerIndex: number): Worker | undefined {
    return this.workersList.find(worker => worker.id === workerIndex);
  }

  getCountById(workerIndex: number): Observable<number> {
    return this.mapCounter.pipe(
      map((countMap) => countMap.get(workerIndex) ?? 0),
    );
  }
}
