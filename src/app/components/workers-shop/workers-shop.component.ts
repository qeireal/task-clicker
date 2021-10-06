import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {Worker} from '../../models/worker';
import {ApiService} from '../../services/api.service';
import {ClickService} from '../../services/click.service';
import {WorkersService} from '../../services/workers.service';

@Component({
  selector: 'workers-shop',
  templateUrl: './workers-shop.component.html',
  styleUrls: ['./workers-shop.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersShopComponent {
  constructor(
    private apiService: ApiService,
    private workersService: WorkersService,
    private clickService: ClickService,
  ) { }

  get workersList(): ReadonlyArray<Worker> {
    return this.workersService.workersList;
  }

  get walletState(): Observable<number> {
    return this.clickService.walletState;
  }

  trackById(index: number) {
    return index;
  }

  handleBuy(index: number): void {
    this.apiService.buyWorker(index).subscribe(_ => this.workersService.buyWorker(index));
  }
}
