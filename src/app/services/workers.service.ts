import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {InitialData} from '../models/initial-data';
import {Worker} from '../models/worker';
import {ClickService} from './click.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {
  workersList!: ReadonlyArray<Worker>;
  mapCounter!: BehaviorSubject<Map<number,number>>;

  constructor(
    private clickService: ClickService,
  ) { }

  init(data: InitialData) {
    this.workersList = data.workersInfo.map(Worker.fromJson);
    const currentWorkers = data.currentWorkers;
    this.mapCounter = new BehaviorSubject(new Map(this.workersList.map(i => [
      i.id,
      currentWorkers.find(currentWorker => currentWorker.workerId === i.id)?.workerCount ?? 0,
    ])));
  }

  buyWorker(workerIndex: number): void {
    const workerToBuy = this.getWorkerById(workerIndex);

    if (!workerToBuy) {
      return;
    }

    const currentMapValue = this.mapCounter.value;
    const currentValue = currentMapValue.get(workerIndex) ?? 0;

    this.mapCounter.next(currentMapValue.set(workerIndex, currentValue + 1));
    this.clickService.buySome(workerToBuy);
  }

  getPurchasedIndexes(): Observable<ReadonlyArray<number>> {
    return this.mapCounter?.pipe(
      map((countMap) => [...countMap.keys()].filter((index) => countMap.get(index) ?? 0 > 0)),
    );
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
