import { TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';
import { Cart } from '../../services/cart';
import { CartPreview } from './cart-preview';

const sample: Product = {
  id: 'prod-tamar',
  name: 'דגם תמר',
  category: 'mezuzahs',
  price: 100,
  currency: null,
  image: null,
  description: '',
  available: true,
};

describe('CartPreview', () => {
  let cart: Cart;

  beforeEach(async () => {
    localStorage.clear();
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
    expect(fixture.nativeElement.textContent).toContain('העגלה ריקה');
    expect(fixture.nativeElement.textContent).toContain('התשלום יתאפשר בקרוב');
  });

  it('lists added items and can remove them', () => {
    cart.add(sample);
    const fixture = TestBed.createComponent(CartPreview);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('דגם תמר');
    expect(fixture.nativeElement.textContent).toContain('סכום ביניים לדוגמה');
    fixture.nativeElement.querySelector('.qty button').click();
    fixture.detectChanges();
    expect(cart.itemCount()).toBe(0);
  });
});
