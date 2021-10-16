import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'credits-page',
  templateUrl: './credits-page.component.html',
  styleUrls: ['./credits-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditsPageComponent {}
