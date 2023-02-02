import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/products/product-view/product-view.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'product-view/:id',
    component: ProductViewComponent,
  },
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
