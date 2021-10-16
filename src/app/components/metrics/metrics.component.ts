import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Upgrade} from '../../models/upgrade';
import {ClickService} from '../../services/click.service';
import {UpgradesService} from '../../services/upgrades.service';

@Component({
  selector: 'metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsComponent {
  constructor(
    private clickService: ClickService,
    private upgradesService: UpgradesService,
  ) { }

  get overallCounter(): Observable<NonNullable<number>> {
    return this.clickService.overallState;
  }

  get walletCounter(): Observable<NonNullable<number>> {
    return this.clickService.walletState;
  }

  get velocity(): Observable<NonNullable<number>> {
    return this.clickService.accumulatorState;
  }

  get currentUpgrade(): Observable<Upgrade> {
    return this.upgradesService.currectUpgrade;
  }
}
