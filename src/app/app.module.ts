import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductViewComponent } from './components/products/product-view/product-view.component';
import { productsReducer } from './state/products/products.reducer';
import { ProductsEffects } from './state/products/products.effects';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AlertModule } from '@full-fledged/alerts';
import { metaReducers, reducers } from './state/app.state';
import { SpinnerEffects } from './state/shared/spinner.effects';
import { AlertEffects } from './state/shared/alert.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductViewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([
      ProductsEffects,
      SpinnerEffects,
      AlertEffects
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
