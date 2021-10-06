import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuButtonComponent {
  @Output()
  onClick = new EventEmitter<number>();

  toogleMenu(): void {
    this.onClick.next();
  }
}
