import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {CurrentWorkersState} from '../../../models/current-workers-state';
import {Worker} from '../../../models/worker';
import {WorkersService} from '../../../services/workers.service';

@Component({
  selector: 'worker-row',
  templateUrl: './worker-row.component.html',
  styleUrls: ['./worker-row.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkerRowComponent implements OnInit {
  @Input()
  workers!: ReadonlyArray<CurrentWorkersState>;

  counter!: Observable<number>;
  workerModel!: Worker | undefined;

  constructor(
    private workersService: WorkersService,
  ) {}

  ngOnInit(): void {
    this.workerModel = this.workersService.getWorkerById(this.workers[0]?.workerId);
  }

  trackById(index: number) {
    return index;
  }
}
