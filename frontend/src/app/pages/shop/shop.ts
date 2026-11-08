import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SHOP_CATEGORIES } from '../../models/product';

@Component({
  selector: 'app-shop',
  imports: [RouterLink],
  templateUrl: './shop.html',
  styleUrl: './page.css',
})
export class ShopPage {
  protected readonly categories = SHOP_CATEGORIES;
}
