import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {CurrentWorkersState} from '../models/current-workers-state';
import {InitialData} from '../models/initial-data';
import {Worker} from '../models/worker';
import {ClickService} from './click.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  workersList!: ReadonlyArray<Worker>;
  currentWorkers!: BehaviorSubject<Array<CurrentWorkersState>>;
  mapCounter!: Observable<Map<number,number>>;

  constructor(
    private clickService: ClickService,
  ) { }

  init(data: InitialData) {
    this.workersList = data.workersInfo.map(Worker.fromJson);
    this.currentWorkers = new BehaviorSubject(data.currentWorkers.map(CurrentWorkersState.fromJson));
    this.mapCounter = this.currentWorkers.pipe(
      map(currentWorkers => {
        const countMap = new Map(this.workersList.map(i => [i.id, 0]));
        currentWorkers.forEach((currentWorker) => {
          countMap.set(currentWorker.workerId, (countMap.get(currentWorker.workerId) ?? 0) + 1);
        });

        return countMap;
      })
    );
  }

  buyWorker(workerIndex: number): void {
    const workerToBuy = this.getWorkerById(workerIndex);

    if (!workerToBuy) {
      return;
    }

    this.currentWorkers.next([...this.currentWorkers.value, new CurrentWorkersState(workerIndex, new Date())]);
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
