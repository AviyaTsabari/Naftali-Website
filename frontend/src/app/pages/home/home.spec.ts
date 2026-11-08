import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomePage } from './home';

describe('HomePage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the studio introduction and section links', () => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('נפתלי');
    expect(text).toContain('שירה');
    expect(text).toContain('חנות');
    expect(text).toContain('יצירת קשר');
  });
});
