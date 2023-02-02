import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/products/products.model';
import * as ProductActions from './products.actions';

export const productsFeatureKey = 'products';

export interface State extends EntityState<Product> {
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

export const initialState: State = adapter.getInitialState({
  error: null,
});

export const productsReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, action) =>
    adapter.setAll(action.products, {
      ...state,
      products: action.products
    })
  ),
  on(
    ProductActions.loadProductsFailure,
    ProductActions.loadProductFailure,
    (state, action) => {
      return {
        ...state,
        error: action.error
      };
    }
  )
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();