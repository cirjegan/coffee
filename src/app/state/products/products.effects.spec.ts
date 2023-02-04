import { Observable } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { ProductsEffects } from './products.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromProductActions from './products.actions';

import { TestScheduler } from 'rxjs/testing';
import { ProductsService } from '../../services/products/products.service';
import { Product } from "../../models/products/products.model";

describe('ProductsEffects', () => {
    const initialState = { products: [] };
    const productsService = jasmine.createSpyObj('productsService', [
        'getProducts'
    ]);
    let effects: ProductsEffects;
    let actions: Observable<any>;
    let store: MockStore<any>;
    let testScheduler: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: ProductsService, useValue: productsService }
            ]
        });

        effects = TestBed.inject(ProductsEffects);
        store = TestBed.inject(MockStore);
        store.setState({});

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    describe('loadAllProducts$', () => {
        it('should handle loadProducts and return a loadProductsSuccess action', () => {
            const products: Product[] = [];
            const action = fromProductActions.loadProducts();
            const outcome = fromProductActions.loadProductsSuccess({ products });

            testScheduler.run(({ hot, cold, expectObservable }: { hot: any, cold: any, expectObservable: any }) => {
                actions = hot('-a', { a: action });
                const response = cold('-b|', { b: products });
                productsService.getProducts.and.returnValue(response);

                expectObservable(effects.loadProducts$).toBe('--b', { b: outcome });
            });
        });
    });
});