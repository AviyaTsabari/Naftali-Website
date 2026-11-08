import { TestBed } from '@angular/core/testing';
import { ProductImage } from './product-image';

describe('ProductImage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductImage],
    }).compileComponents();
  });

  it('uses the default image when no source is provided', () => {
    const fixture = TestBed.createComponent(ProductImage);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe(
      '/images/no-image.webp',
    );
  });

  it('uses the product image when one is provided', () => {
    const fixture = TestBed.createComponent(ProductImage);
    fixture.componentRef.setInput('src', '/images/real.webp');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe('/images/real.webp');
  });
});
