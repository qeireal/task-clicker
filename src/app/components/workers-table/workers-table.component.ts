import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';

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

  get purchasedIndexes(): Observable<ReadonlyArray<number>> {
    return this.workersService.getPurchasedIndexes();
  }

  trackById(index: number) {
    return index;
  }
}
