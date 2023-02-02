import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '@full-fledged/alerts';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromProductActions from '../products/products.actions';

@Injectable()
export class AlertEffects {
    // Load Products Failure
    unableToLoadProducts$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromProductActions.loadProductsFailure),
                tap(() => {
                    this.alertService.danger('Unable to load products');
                })
            ),
        { dispatch: false }
    );

    //Load Product Failure
    unableToLoadProduct$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromProductActions.loadProductFailure),
                tap(() => {
                    this.alertService.danger('Unable to find Product');
                    this.router.navigate(['/products']);
                })
            ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private router: Router, private alertService: AlertService) { }
}