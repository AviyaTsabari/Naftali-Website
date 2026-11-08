import { Cart } from './cart';
import { Product } from '../models/product';

const sample: Product = {
  id: 'prod-tamar',
  name: 'דגם תמר',
  category: 'mezuzahs',
  price: 100,
  currency: null,
  image: null,
  description: 'תיאור יוצג כאן',
  available: true,
};

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    localStorage.clear();
    cart = new Cart();
  });

  it('starts empty and closed', () => {
    expect(cart.itemCount()).toBe(0);
    expect(cart.isOpen()).toBeFalse();
    expect(cart.subtotal()).toBe(0);
  });

  it('adds a product once and opens the cart', () => {
    expect(cart.add(sample)).toBeTrue();
    expect(cart.itemCount()).toBe(1);
    expect(cart.has(sample.id)).toBeTrue();
    expect(cart.isOpen()).toBeTrue();
    expect(cart.subtotal()).toBe(100);
    expect(cart.add(sample)).toBeFalse();
    expect(cart.itemCount()).toBe(1);
  });

  it('removes a product and updates the subtotal', () => {
    cart.add(sample);
    cart.setQuantity(sample.id, 0);
    expect(cart.itemCount()).toBe(0);
    expect(cart.subtotal()).toBe(0);
  });

  it('persists items in local storage', () => {
    cart.add(sample);
    const restored = new Cart();
    expect(restored.itemCount()).toBe(1);
    expect(restored.list()[0].productId).toBe('prod-tamar');
  });
});
