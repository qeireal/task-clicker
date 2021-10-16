import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ShopPageType} from '../../models/shop-page-type';
import {Upgrade} from '../../models/upgrade';
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
  readonly employees = ShopPageType.employees;
  readonly yourself = ShopPageType.yourself;

  pageSelected = ShopPageType.employees;

  constructor(
    private workersService: WorkersService,
    private clickService: ClickService,
  ) { }

  get workersList(): ReadonlyArray<Worker> {
    return this.workersService.workersList;
  }

  get upgradesList(): ReadonlyArray<Upgrade> {
    return this.workersService.upgradesList;
  }

  get walletState(): Observable<number> {
    return this.clickService.walletState;
  }

  trackById(index: number) {
    return index;
  }
}
