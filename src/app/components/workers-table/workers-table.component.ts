import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';

import {CurrentWorkersState} from '../../models/current-workers-state';
import {WorkersService} from '../../services/workers.service';

@Component({
  selector: 'workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersTableComponent {
  constructor(
    private workersService: WorkersService,
  ) {}

  get currentWorkersLists(): Observable<ReadonlyArray<ReadonlyArray<CurrentWorkersState>>> {
    return this.workersService.mapCounter.pipe(
      withLatestFrom(this.workersService.currentWorkers),
      map(([mapCounter, currectWorkersState]) => {
        const resultList = <Array<ReadonlyArray<CurrentWorkersState>>>[];

        mapCounter.forEach((count, id) => {
          if (count > 0) {
            resultList.push(currectWorkersState.filter(worker => worker.workerId === id))
          }
        });

        return resultList;
      })
    );
  }

  get isCompanyEmpty(): Observable<boolean> {
    return this.workersService.currentWorkers.pipe(
      map(workers => workers.length === 0)
    );
  }

  trackById(index: number) {
    return index;
  }
}
