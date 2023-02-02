import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './products.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products/products.service';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) { }

  /*****LOAD PRODUCTS API EFFECT ** */
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(() =>
        from(this.productsService.getPosts()).pipe(
          map((data) =>
            ProductActions.loadProductsSuccess({ products: data })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error })
            )
          )
        )
      )
    )
  );
}
