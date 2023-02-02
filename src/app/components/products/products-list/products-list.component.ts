import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/products/products.model';
import { AppState } from 'src/app/state/app.state';
import * as ProductActions from 'src/app/state/products/products.actions';
import * as ProductSelector from 'src/app/state/products/products.selector';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  allProducts$: Observable<Product[]>;

  config: PaginationInstance = {
    id: 'productsPagination',
    itemsPerPage: 10,
    currentPage: 1
  };
  maxSize = 0;
  responsive = false;

  productViewModel$: Observable<ProductSelector.ProductsViewModel>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.productViewModel$ = this.store.pipe(select(ProductSelector.selectProductsViewModel));
    this.productViewModel$.subscribe((res) => {
      if (res.products.length == 0) {
        this.store.dispatch(ProductActions.loadProducts());
      }
    });
  }

  onPageChange(number: number) {
    this.config.currentPage = number;
  }
}
