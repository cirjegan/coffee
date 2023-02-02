import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../models/products/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`https://random-data-api.com/api/coffee/random_coffee?size=50`);
  }
}