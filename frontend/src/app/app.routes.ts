import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { PoetryPage } from './pages/poetry/poetry';
import { PoemDetailPage } from './pages/poetry/detail/poem-detail';
import { ShopPage } from './pages/shop/shop';
import { ShopCategoryPage } from './pages/shop/category/shop-category';
import { ContactPage } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'poetry', component: PoetryPage },
  { path: 'poetry/:id', component: PoemDetailPage },
  { path: 'shop', component: ShopPage },
  { path: 'shop/:category', component: ShopCategoryPage },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '' },
];
