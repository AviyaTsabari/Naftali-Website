import { Cart } from './cart';

describe('Cart', () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it('starts empty and closed', () => {
    expect(cart.itemCount()).toBe(0);
    expect(cart.isOpen()).toBeFalse();
  });

  it('opens and closes', () => {
    cart.open();
    expect(cart.isOpen()).toBeTrue();

    cart.close();
    expect(cart.isOpen()).toBeFalse();
  });

  it('toggles open state', () => {
    cart.toggle();
    expect(cart.isOpen()).toBeTrue();

    cart.toggle();
    expect(cart.isOpen()).toBeFalse();
  });
});
