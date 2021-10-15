import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {DataResponse} from '../models/data-response';
import {InitialData} from '../models/initial-data';
import {LeaderboardRow} from '../models/leaderboard-row';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://wrikeclicker-env.eu-north-1.elasticbeanstalk.com/api';
  private nickname = '';

  constructor(private http: HttpClient){ };

  getInitialData(nickname: string): Observable<InitialData> {
    this.nickname = nickname;

    return this.http.get<DataResponse<InitialData>>(
      `${this.apiUrl}/get-initial-data`,
      {params: {nickname: this.nickname}}
    ).pipe(
      map(response => response.data),
    );
  }

  buyWorker(workerId: number, manualClicks: number): Observable<void> {
    return this.http.get<void>(
      `${this.apiUrl}/buy-worker`,
      {
        params: {
          nickname: this.nickname,
          workerId: workerId,
          completedTasks: manualClicks,
        }
      }
    );
  }

  sendCompletedTasks(completedTasks: number): Observable<void> {
    return this.http.get<void>(
      `${this.apiUrl}/send-completed-tasks`,
      {
        params: {
          nickname: this.nickname,
          completedTasks: completedTasks
        }
      }
    );
  }

  getLeaders(): Observable<ReadonlyArray<LeaderboardRow>> {
    return this.http.get<DataResponse<ReadonlyArray<LeaderboardRow>>>(
      `${this.apiUrl}/get-leaders`,
      {params: {nickname: this.nickname}}
    ).pipe(
      map(response => response.data),
    );
  }

  closeSession(): void {
    const data = new FormData();

    data.append('nickname', this.nickname);
    navigator.sendBeacon(`${this.apiUrl}/close-session`, data);
  }
}
