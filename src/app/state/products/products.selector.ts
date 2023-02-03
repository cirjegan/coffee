import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as ProductReducer from './products.reducer';
import * as ProductModel from '../../models/products/products.model';

export const selectProductsState = createFeatureSelector<ProductReducer.State>(
  ProductReducer.productsFeatureKey
);

export const selectAllProducts = createSelector(
  selectProductsState,
  ProductReducer.selectAll
);

export const selectAllEntities = createSelector(
  selectProductsState,
  ProductReducer.selectEntities
);

/** Products View Model */
export interface ProductsViewModel {
  products: ProductModel.Product[];
}

export const selectProductsViewModel = (props: ProductModel.PageQuery) =>
  createSelector(selectAllProducts, (products: ProductModel.Product[]): ProductsViewModel => {
    const startIndex = props.pageIndex * props.pageSize;
    const pageEnd = startIndex + props.pageSize;
    return {
      products: products.slice(startIndex, pageEnd),
    };
  }
  );

export const selectProductsCount = createSelector(
  selectAllProducts,
  allResults => allResults.length
);

/** Checking whether the Product already exists in State */
export const entityExists = (props: string) =>
  createSelector(selectAllEntities, (state): boolean => {
    return state[props] == undefined ? false : true;
  }
  );

/** Retrieve the product based on id */
export const selectEntityById = (props: string) =>
  createSelector(selectAllEntities, (state): ProductModel.Product => {
    return state[props]!;
  });