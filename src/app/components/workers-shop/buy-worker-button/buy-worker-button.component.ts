import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Worker} from '../../../models/worker';

@Component({
  selector: 'buy-worker-button',
  templateUrl: './buy-worker-button.component.html',
  styleUrls: ['./buy-worker-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyWorkerButtonComponent {
  @Input()
  worker!: Worker;

  @Input()
  wallet!: number;

  @Output()
  onBuy = new EventEmitter<number>();

  handleClick() {
    this.onBuy.next(this.worker.id);
  }
}
