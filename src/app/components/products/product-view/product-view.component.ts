import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { merge, mergeMap, Observable } from 'rxjs';
import { Product } from 'src/app/models/products/products.model';
import { AppState } from 'src/app/state/app.state';
import * as fromProductSelectors from '../../../state/products/products.selector';
import * as fromProductActions from '../../../state/products/products.actions';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductViewComponent implements OnInit {
  product$: Observable<Product>;
  isProductInStore$: Observable<boolean>;
  productId: string;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') || '';

    if (this.productId) {
      const entitySelector = fromProductSelectors.entityExists(this.productId);
      this.isProductInStore$ = this.store.select(entitySelector);

      const entityById = fromProductSelectors.selectEntityById(this.productId);

      this.product$ = this.isProductInStore$.pipe(
        mergeMap((isProductInStore) => {
          if (!isProductInStore) {
            this.store.dispatch(
              fromProductActions.loadProductFailure({ error: "Unable to load the product" })
            );
          }
          return this.store.select(entityById);
        })
      );
    } else {
      this.store.dispatch(
        fromProductActions.loadProductFailure({ error: "Unable to load the product" })
      );
    }
  }
}
