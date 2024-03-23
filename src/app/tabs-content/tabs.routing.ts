import { Routes } from '@angular/router';
import { AllProductsComponent } from './all-products/all-products.component';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'all-products'
  },
  {
    path: 'all-products',
    component: AllProductsComponent,
  },
  {
    path: 'my-products',
    loadComponent: () => import('./my-products/my-products.component').then(c => c.MyProductsComponent)
  },
  // Add more tabs as needed
];
