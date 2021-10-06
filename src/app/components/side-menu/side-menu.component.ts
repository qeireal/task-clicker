import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent {
  @Output()
  onOpenLeaderboard = new EventEmitter<number>();

  openLeaderboard(): void {
    this.onOpenLeaderboard.next();
  }

  logout(): void {
    window.location.reload();
  }
}
