import { TestBed } from '@angular/core/testing';
import { LoginPreview } from './login-preview';

describe('LoginPreview', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPreview],
    }).compileComponents();
  });

  it('is hidden by default', () => {
    const fixture = TestBed.createComponent(LoginPreview);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('shows a disabled preview form when open', () => {
    const fixture = TestBed.createComponent(LoginPreview);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const email = fixture.nativeElement.querySelector('input[name="email"]') as HTMLInputElement;
    const password = fixture.nativeElement.querySelector(
      'input[name="password"]',
    ) as HTMLInputElement;
    const submit = fixture.nativeElement.querySelector('form button') as HTMLButtonElement;

    expect(fixture.nativeElement.textContent).toContain('תצוגה מקדימה — הכניסה תתאפשר בקרוב');
    expect(email.disabled).toBeTrue();
    expect(password.disabled).toBeTrue();
    expect(submit.disabled).toBeTrue();
  });

  it('emits closed when the close button is clicked', () => {
    const fixture = TestBed.createComponent(LoginPreview);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    let closed = false;
    fixture.componentInstance.closed.subscribe(() => {
      closed = true;
    });

    fixture.nativeElement.querySelector('.close').click();
    expect(closed).toBeTrue();
  });
});
