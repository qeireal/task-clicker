import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RulesPageComponent {}
