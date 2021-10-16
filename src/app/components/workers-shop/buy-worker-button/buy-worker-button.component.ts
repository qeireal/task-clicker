import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Upgrade} from '../../../models/upgrade';
import {Worker} from '../../../models/worker';
import {ApiService} from '../../../services/api.service';
import {ClickService} from '../../../services/click.service';
import {UpgradesService} from '../../../services/upgrades.service';
import {WorkersService} from '../../../services/workers.service';

@Component({
  selector: 'buy-worker-button',
  templateUrl: './buy-worker-button.component.html',
  styleUrls: ['./buy-worker-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyWorkerButtonComponent {
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private workersService: WorkersService,
    private clickService: ClickService,
    private upgradeService: UpgradesService,
  ) { }

  @Input()
  entity!: Worker | Upgrade;

  @Input()
  wallet!: number;

  @Input()
  isWorker!: boolean;

  get isDisabled(): boolean {
    return this.entity.price > this.wallet;
  }

  handleClick() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    if (this.isWorker) {
      this.apiService.buyWorker(this.entity.id, this.clickService.manualClicks).subscribe(_ => {
        this.workersService.buyWorker(this.entity.id)
        this.isLoading = false;
      });

      return;
    }

    this.apiService.buyUpgrade(this.entity.id, this.clickService.manualClicks).subscribe(_ => {
      this.upgradeService.buyUpgrade(this.entity.id)
      this.isLoading = false;
    });
  }
}
