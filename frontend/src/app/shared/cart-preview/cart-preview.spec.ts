import { TestBed } from '@angular/core/testing';
import { Cart } from '../../services/cart';
import { CartPreview } from './cart-preview';

describe('CartPreview', () => {
  let cart: Cart;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPreview],
      providers: [Cart],
    }).compileComponents();

    cart = TestBed.inject(Cart);
  });

  it('is hidden while the cart is closed', () => {
    const fixture = TestBed.createComponent(CartPreview);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('shows an empty cart and a coming-soon checkout message', () => {
    cart.open();
    const fixture = TestBed.createComponent(CartPreview);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('עגלת קניות');
    expect(fixture.nativeElement.textContent).toContain('העגלה ריקה');
    expect(fixture.nativeElement.textContent).toContain('התשלום יתאפשר בקרוב');
  });

  it('closes from the close button', () => {
    cart.open();
    const fixture = TestBed.createComponent(CartPreview);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.close').click();
    fixture.detectChanges();

    expect(cart.isOpen()).toBeFalse();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });
});
