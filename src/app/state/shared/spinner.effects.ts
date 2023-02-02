import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';

import * as fromProductActions from '../products/products.actions';

@Injectable()
export class SpinnerEffects {
    spinneron$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    fromProductActions.loadProducts
                ),
                tap(() => this.spinner.show())
            ),
        { dispatch: false }
    );

    spinneroff$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    fromProductActions.loadProductsFailure,
                    fromProductActions.loadProductsSuccess,
                    fromProductActions.loadProductFailure,
                ),
                tap(() => {
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 1000);
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private spinner: NgxSpinnerService) { }
}
