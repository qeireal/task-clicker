import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

import {DialogType} from '../../models/dialog-type';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  @Output()
  onDialog = new EventEmitter<DialogType>();

  openLeaderboard(): void {
    this.onDialog.next(DialogType.leaderboard);
  }

  openRules(): void {
    this.onDialog.next(DialogType.rules);
  }

  openCreadits(): void {
    this.onDialog.next(DialogType.credits);
  }

  logout(): void {
    window.location.reload();
  }
}
