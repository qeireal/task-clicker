import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {InitialData} from '../models/initial-data';
import {Upgrade} from '../models/upgrade';
import {ClickService} from './click.service';

@Injectable({
  providedIn: 'root'
})
export class UpgradesService {
  upgradesList: ReadonlyArray<Upgrade> = [
    new Upgrade(2, 'Junior', 3, 200),
    new Upgrade(3, 'Middle', 10, 1000),
    new Upgrade(4, 'Senior', 35, 5000),
    new Upgrade(5, 'Tech lead', 150, 20000),
  ];

  currectUpgrade = new BehaviorSubject<Upgrade>(new Upgrade(1, 'Intern', 1, 0));

  constructor(
    private clickService: ClickService,
  ) { }

  init(data: InitialData) {
    // this.workersList = data.workersInfo.map(Worker.fromJson);
    // const currentWorkers = data.currentWorkers;
    // this.mapCounter = new BehaviorSubject(new Map(this.workersList.map(i => [
    //   i.id,
    //   currentWorkers.find(currentWorker => currentWorker.workerId === i.id)?.workerCount ?? 0,
    // ])));
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
