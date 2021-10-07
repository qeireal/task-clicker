import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  @ViewChild('nameInput')
  nameInput!: ElementRef;

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler() {
    this.nameInput?.nativeElement?.focus();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.pattern('^\\w+$')]],
    });
  }

  get isInvalid(): boolean {
    return this.form.invalid && this.form.dirty;
  }
}
