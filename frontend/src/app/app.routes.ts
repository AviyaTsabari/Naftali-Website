import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { PoetryPage } from './pages/poetry/poetry';
import { ShopPage } from './pages/shop/shop';
import { ContactPage } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'poetry', component: PoetryPage },
  { path: 'shop', component: ShopPage },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '' },
];
