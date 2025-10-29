import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'contacts/:id',
    loadComponent: () => import('./contact-detail/contact-detail.page').then( m => m.ContactDetailPage)
  },
  {
    path: 'contact/create',
    loadComponent: () => import('./contact-create/contact-create.page').then( m => m.ContactCreatePage)
  },

];
