import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Worker} from '../../../models/worker';
import {ApiService} from '../../../services/api.service';
import {ClickService} from '../../../services/click.service';
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
  ) { }

  @Input()
  worker!: Worker;

  @Input()
  wallet!: number;

  get isDisabled(): boolean {
    return this.worker.price > this.wallet;
  }

  handleClick() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    this.apiService.buyWorker(this.worker.id, this.clickService.manualClicks).subscribe(_ => {
      this.workersService.buyWorker(this.worker.id)
      this.isLoading = false;
    });
  }
}
