import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: ContentComponent
  },
  // {
  //   path: 'all-products',
  //   loadChildren: () => import('./tabs-content/tabs.routing').then(m => m.TABS_ROUTES)
  // },
];
