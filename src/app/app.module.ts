import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {CreditsPageComponent} from './components/credits-page/credits-page.component';
import {LeaderboardComponent} from './components/leaderboard/leaderboard.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {MainTaskComponent} from './components/main-task/main-task.component';
import {MenuButtonComponent} from './components/menu-button/menu-button.component';
import {MetricsComponent} from './components/metrics/metrics.component';
import {RulesPageComponent} from './components/rules-page/rules-page.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {BuyWorkerButtonComponent} from './components/workers-shop/buy-worker-button/buy-worker-button.component';
import {WorkersShopComponent} from './components/workers-shop/workers-shop.component';
import {WorkerRowComponent} from './components/workers-table/worker-row/worker-row.component';
import {WorkersTableComponent} from './components/workers-table/workers-table.component';

@NgModule({
  declarations: [
    AppComponent,
    MainTaskComponent,
    WorkersTableComponent,
    WorkersShopComponent,
    MetricsComponent,
    BuyWorkerButtonComponent,
    WorkerRowComponent,
    MenuButtonComponent,
    SideMenuComponent,
    LeaderboardComponent,
    LoginPageComponent,
    RulesPageComponent,
    CreditsPageComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
