import { TestBed } from '@angular/core/testing';
import { ShopPage } from './shop';

describe('ShopPage', () => {
  it('renders the shop heading', () => {
    const fixture = TestBed.createComponent(ShopPage);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('חנות');
  });
});
