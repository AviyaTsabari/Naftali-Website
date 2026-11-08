export type ProductCategory = 'mezuzahs' | 'hanukkiahs' | 'furniture';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: string | null;
  image: string | null;
  description: string;
  available: boolean;
}

export const SHOP_CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'mezuzahs', label: 'מזוזות' },
  { id: 'hanukkiahs', label: 'חנוכיות' },
  { id: 'furniture', label: 'ריהוט בוטיק' },
];

export function categoryLabel(id: string): string | undefined {
  return SHOP_CATEGORIES.find((category) => category.id === id)?.label;
}

export function isProductCategory(value: string): value is ProductCategory {
  return SHOP_CATEGORIES.some((category) => category.id === value);
}
