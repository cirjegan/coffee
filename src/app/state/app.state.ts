import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromProduct from '../state/products/products.reducer';

export interface AppState {
  [fromProduct.productsFeatureKey]: fromProduct.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromProduct.productsFeatureKey]: fromProduct.productsReducer
}

export const metaReducers: MetaReducer<AppState>[] = !isDevMode()
  ? [debug]
  : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
