import * as fromProductSelectors from './products.selector';
import { Product } from '../../models/products/products.model';

describe('ProductsSelectors', () => {
    it('selectEntityById: should return the selected product', () => {
        const entities = [
            {
                id: 3337,
                uid: "9b038574-9a8c-4324-af01-1bc121472e47",
                blend_name: "Joe Coffee",
                origin: "Kiamba, Kenya",
                variety: "Colombia",
                notes: "muted, syrupy, red currant, lemonade, strawberry",
                intensifier: "bright"
            },
            {
                id: 3421,
                uid: "ba26b123-f3ca-4ee9-9e63-a7c069b6c323",
                blend_name: "Jacked Blend",
                origin: "Mount Elgon, Uganda",
                variety: "Bourbon",
                notes: "pointed, full, honeydew, cantaloupe, curry",
                intensifier: "dry"
            }
        ];
        const selectedProductId = 3421;
        const expectedResult = {
            id: 3421,
            uid: "ba26b123-f3ca-4ee9-9e63-a7c069b6c323",
            blend_name: "Jacked Blend",
            origin: "Mount Elgon, Uganda",
            variety: "Bourbon",
            notes: "pointed, full, honeydew, cantaloupe, curry",
            intensifier: "dry"
        };

        expect(fromProductSelectors.selectEntityById(selectedProductId).projector(entities))
            .toEqual(expectedResult);
    });

});
