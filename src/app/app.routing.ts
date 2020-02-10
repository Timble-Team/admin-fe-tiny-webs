import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard , LoginGuard} from './core/services/auth/auth-guard';
import { AdminResolver } from './admin/admin.resolver';

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: {
      data: AdminResolver
    },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
