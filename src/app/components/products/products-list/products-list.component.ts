import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';

import * as ProductActions from 'src/app/state/products/products.actions';
import * as ProductSelector from 'src/app/state/products/products.selector';
import * as ProductsModel from 'src/app/models/products/products.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnInit, OnDestroy {
  allProducts$: Observable<ProductsModel.Product[]>;

  productViewModel$: Observable<ProductSelector.ProductsViewModel>;
  productSubscription: Subscription;

  productsCount$: Observable<number>;
  productsCount: number;
  productsCountSubscription: Subscription;

  paginate: ProductsModel.PageQuery = {
    pageIndex: 0,
    pageSize: 10,
    firstPage: true,
    lastPage: false
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.productsCount$ = this.store.pipe(select(ProductSelector.selectProductsCount));
    this.productsCountSubscription = this.productsCount$.subscribe((res) => {
      this.productsCount = res;
    });

    this.loadProductsBasedOnPagination();
    this.productSubscription = this.productViewModel$.subscribe((res) => {
      if (res.products.length == 0) {
        this.store.dispatch(ProductActions.loadProducts());
      }
    });
  }

  loadProductsBasedOnPagination() {
    this.productViewModel$ = this.store.pipe(select(ProductSelector.selectProductsViewModel(this.paginate)));
  }

  onPageChange(newPageIndex: number) {
    this.paginate.pageIndex = newPageIndex;
    this.loadProductsBasedOnPagination();

    const totalPages = this.productsCount / this.paginate.pageSize;
    this.paginate.firstPage = newPageIndex == 0 ? true : false;
    this.paginate.lastPage = (totalPages - 1) == newPageIndex ? true : false;
  }

  ngOnDestroy() {
    this.productSubscription && this.productSubscription.unsubscribe();
    this.productsCountSubscription && this.productsCountSubscription.unsubscribe();
  }
}