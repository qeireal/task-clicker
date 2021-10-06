import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  index = 0;

  counter!: Observable<number>;
  workerModel!: Worker | undefined;

  constructor(
    private workersService: WorkersService,
  ) {}

  ngOnInit(): void {
    this.counter = this.workersService.getCountById(this.index);
    this.workerModel = this.workersService.getWorkerById(this.index);
  }

  get fakeArray(): Observable<Array<void>> {
    return this.counter.pipe(
      map((num) => Array(num > 10 ? 10 : num))
    );
  }

  trackById(index: number) {
    return index;
  }
}
