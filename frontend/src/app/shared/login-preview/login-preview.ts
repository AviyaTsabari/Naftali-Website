import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-login-preview',
  templateUrl: './login-preview.html',
  styleUrl: './login-preview.css',
})
export class LoginPreview {
  readonly open = input(false);
  readonly closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
