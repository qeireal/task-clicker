import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {LeaderboardRow} from '../../models/leaderboard-row';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeaderboardComponent implements OnInit {
  leaderboardStats!: ReadonlyArray<LeaderboardRow>;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.apiService.getLeaders().subscribe(result => {
      this.leaderboardStats = result;
      this.cdr.markForCheck();
    });
  }
}
