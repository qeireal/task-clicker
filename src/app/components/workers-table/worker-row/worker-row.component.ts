import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

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
  subscription!: Subscription;

  constructor(
    private workersService: WorkersService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.workerModel = this.workersService.getWorkerById(this.workers[0]?.workerId);

    this.subscription = interval(10000).pipe(
      tap(() => this.cdr.markForCheck())
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  trackById(index: number) {
    return index;
  }

  getProgressValue(workerEndTime: Date) {
    const endTime = new Date(workerEndTime);
    const startDate = endTime.getTime() - WorkersService.workersLifetime;
    const endDate = endTime.getTime();
    const currentDate = (new Date()).getTime();

    return 100 - (Math.floor((currentDate - startDate) * 100 / (endDate - startDate)));
  }
}
