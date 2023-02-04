import * as fromProductsReducer from './products.reducer';
import * as fromProductActions from './products.actions';
import { Product } from 'src/app/models/products/products.model';

describe('ProductsReducer', () => {
    const testProduct: Product = {
        id: 3337,
        uid: "9b038574-9a8c-4324-af01-1bc121472e47",
        blend_name: "Joe Coffee",
        origin: "Kiamba, Kenya",
        variety: "Colombia",
        notes: "muted, syrupy, red currant, lemonade, strawberry",
        intensifier: "bright"
    };

    describe('Undefined Action', () => {
        it('should return the default state', () => {
            const action = { type: 'NOACTION' } as any;
            const result = fromProductsReducer.productsReducer(undefined, action);

            expect(result).toBe(fromProductsReducer.initialState);
        });
    });

    describe('Load All Products Success Action', () => {
        it('should load all products to state', () => {
            const testProducts = [testProduct];
            const action = fromProductActions.loadProductsSuccess({ products: testProducts });
            const result = fromProductsReducer.productsReducer(fromProductsReducer.initialState, action);

            expect(result).toEqual({
                ...fromProductsReducer.initialState,
                entities: testProducts.reduce(
                    (entityMap, product) => ({
                        ...entityMap,
                        [product.id]: product
                    }),
                    {}
                ),
                ids: testProducts.map(product => product.id),
                error: null
            });
        });
    });

    describe('Load All Products Fail', () => {
        it('should update error in state', () => {
            const testProducts = [testProduct];
            const error = new Error();
            const action = fromProductActions.loadProductsFailure({ error });
            const result = fromProductsReducer.productsReducer(fromProductsReducer.initialState, action);

            expect(result).toEqual({
                ...fromProductsReducer.initialState,
                error
            });
        });
    });

    describe('Load Product Fail', () => {
        it('should update error in state if product fails to load', () => {
            const testProducts = [testProduct];
            const error = new Error();
            const action = fromProductActions.loadProductFailure({ error });
            const result = fromProductsReducer.productsReducer(fromProductsReducer.initialState, action);

            expect(result).toEqual({
                ...fromProductsReducer.initialState,
                error
            });
        });
    });
});