import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {switchMap, tap} from 'rxjs/operators';

import {CreditsPageComponent} from './components/credits-page/credits-page.component';
import {LeaderboardComponent} from './components/leaderboard/leaderboard.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {RulesPageComponent} from './components/rules-page/rules-page.component';
import {DialogType} from './models/dialog-type';
import {ApiService} from './services/api.service';
import {ClickService} from './services/click.service';
import {UpgradesService} from './services/upgrades.service';
import {WorkersService} from './services/workers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'task-clicker';

  appInited = false;
  isSidenavOpened = false;
  isLeaderboardOpened = false;

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(): void {
    this.apiService.closeSession();
  }

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private apiService: ApiService,
    private clickService: ClickService,
    private workersService: WorkersService,
    private upgradesService: UpgradesService,
  ) {};

  ngOnInit(): void {
    this.dialog.open(LoginPageComponent, {disableClose: true})
      .afterClosed()
      .pipe(
        switchMap((result) => this.apiService.getInitialData(result)),
        tap((result) => {
          this.dialog.open(RulesPageComponent);
          this.clickService.init(result);
          this.workersService.init(result);
          this.upgradesService.init(result);

          this.appInited = true;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  handleMenuClick(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  handleOpenDialog(dialogType: DialogType): void {
    if (dialogType === DialogType.leaderboard) {
      this.dialog.open(LeaderboardComponent);

      return;
    }

    if (dialogType === DialogType.rules) {
      this.dialog.open(RulesPageComponent);

      return;
    }

    if (dialogType === DialogType.credits) {
      this.dialog.open(CreditsPageComponent);

      return;
    }
  }
}
