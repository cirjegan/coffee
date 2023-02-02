import { createAction, props } from '@ngrx/store';
import { Product } from "src/app/models/products/products.model";

/*****LOAD PRODUCTS ** */
export const loadProducts = createAction(
    '[Products List Component] Load Products'
);

export const loadProductsSuccess = createAction(
    '[Product Effect] Load Products Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Products Component] Load Products Failure',
    props<{ error: any }>()
);

/***** INDIVIDUAL PRODUCT ** */
export const loadProductFailure = createAction(
    '[Product Effect] Load Product Failure',
    props<{ error: any }>()
);