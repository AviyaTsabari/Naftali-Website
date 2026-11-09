import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { API_URL } from '../core/api';
import { Poem } from '../models/poem';
import { Product, ProductCategory } from '../models/product';

const STATIC_PRODUCTS_URL = '/catalog/products.json';
const STATIC_POEMS_URL = '/catalog/poems.json';

@Injectable({ providedIn: 'root' })
export class Catalog {
  private readonly http = inject(HttpClient);

  listProducts(category?: ProductCategory): Observable<Product[]> {
    const options = category ? { params: { category } } : {};
    return this.http.get<Product[]>(`${API_URL}/products`, options).pipe(
      catchError(() =>
        this.http.get<Product[]>(STATIC_PRODUCTS_URL).pipe(
          map((items) => (category ? items.filter((item) => item.category === category) : items)),
        ),
      ),
      catchError(this.toHebrewError('לא ניתן לטעון את המוצרים כרגע')),
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`).pipe(
      catchError(() =>
        this.http.get<Product[]>(STATIC_PRODUCTS_URL).pipe(
          switchMap((items) => {
            const match = items.find((item) => item.id === id);
            return match ? of(match) : throwError(() => new Error('המוצר לא נמצא'));
          }),
        ),
      ),
      catchError(this.toHebrewError('המוצר לא נמצא')),
    );
  }

  listPoems(): Observable<Poem[]> {
    return this.http.get<Poem[]>(`${API_URL}/poems`).pipe(
      catchError(() => this.http.get<Poem[]>(STATIC_POEMS_URL)),
      catchError(this.toHebrewError('לא ניתן לטעון את השירים כרגע')),
    );
  }

  getPoem(id: string): Observable<Poem> {
    return this.http.get<Poem>(`${API_URL}/poems/${id}`).pipe(
      catchError(() =>
        this.http.get<Poem[]>(STATIC_POEMS_URL).pipe(
          switchMap((items) => {
            const match = items.find((item) => item.id === id);
            return match ? of(match) : throwError(() => new Error('השיר לא נמצא'));
          }),
        ),
      ),
      catchError(this.toHebrewError('השיר לא נמצא')),
    );
  }

  private toHebrewError(message: string) {
    return (error: HttpErrorResponse | Error) => {
      if (error instanceof Error && !(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) {
          return throwError(() => new Error(message));
        }
        if (error.status === 400) {
          return throwError(() => new Error('הקטגוריה לא נמצאה'));
        }
      }
      return throwError(() => new Error(message));
    };
  }
}
