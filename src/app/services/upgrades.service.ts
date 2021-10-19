import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {InitialData} from '../models/initial-data';
import {Upgrade} from '../models/upgrade';
import {ClickService} from './click.service';

@Injectable({
  providedIn: 'root'
})
export class UpgradesService {
  upgradesList!: ReadonlyArray<Upgrade>;
  currectUpgrade!: BehaviorSubject<Upgrade>;

  constructor(
    private clickService: ClickService,
  ) { }

  get upgradesToPurchase(): Observable<ReadonlyArray<Upgrade>> {
    return this.currectUpgrade.pipe(
      map(currectUpgrade => this.upgradesList.filter(upgrade => upgrade.id > currectUpgrade.id))
    );
  }

  init(data: InitialData) {
    this.upgradesList = data.upgradesInfo.map(Upgrade.fromJson);
    const currentUpgrade = this.upgradesList.find((upgrade) => upgrade.id === data.currentUpgradeId) ?? this.upgradesList[0];

    this.clickService.buyUpgrade(currentUpgrade);
    this.currectUpgrade = new BehaviorSubject(currentUpgrade);
  }

  buyUpgrade(upgradeIndex: number): void {
    const upgradeToBuy = this.getUpgradeById(upgradeIndex);

    if (!upgradeToBuy) {
      return;
    }

    this.currectUpgrade.next(upgradeToBuy);
    this.clickService.buyUpgrade(upgradeToBuy);
  }

  getUpgradeById(upgradeIndex: number): Upgrade | undefined {
    return this.upgradesList.find(worker => worker.id === upgradeIndex);
  }
}
