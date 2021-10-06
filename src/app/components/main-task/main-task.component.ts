import {ChangeDetectionStrategy, Component} from '@angular/core';

import {ClickService} from '../../services/click.service';

@Component({
  selector: 'main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainTaskComponent {

  constructor(
    private clickService: ClickService,
  ) { }

  handleClick(): void {
    this.clickService.addClicks(10);
  }
}
