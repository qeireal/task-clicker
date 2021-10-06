import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {switchMap} from 'rxjs/operators';

import {LeaderboardComponent} from './components/leaderboard/leaderboard.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {ApiService} from './services/api.service';
import {ClickService} from './services/click.service';
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
  ) {};

  ngOnInit(): void {
    this.dialog.open(LoginPageComponent, {disableClose: true})
      .afterClosed()
      .pipe(
        switchMap((result) => this.apiService.getInitialData(result))
      )
      .subscribe(data => {
        this.clickService.init(data);
        this.workersService.init(data);

        this.appInited = true;
        this.cdr.markForCheck();
      });
  }

  handleMenuClick(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  handleOpenLeaderboard(): void {
    this.dialog.open(LeaderboardComponent);
  }
}
