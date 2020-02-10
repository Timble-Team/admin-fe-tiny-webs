import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AgenciesComponent } from './agencies.component';
import { SharedModule } from 'primeng/components/common/shared';

const routes: Routes = [
  {
    path: '',
    component: AgenciesComponent,
    data: {
      breadcrumb: 'Đơn vị'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('./agencies-list/agencies-list.module').then(m => m.AgenciesListModule)
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'Tạo đơn vị'
        },
        loadChildren: () => import('./agencies-new-edit/agencies-new-edit.module').then(m => m.AgenciesNewEditModule)
      },
      {
        path: ':id/edit',
        data: {
          breadcrumb: 'Sửa Thông tin đơn vị'
        },
        loadChildren: () => import('./agencies-new-edit/agencies-new-edit.module').then(m => m.AgenciesNewEditModule)
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Thông tin đơn vị'
        },
        loadChildren: () => import('./agencies-detail/agencies-detail.module').then(m => m.AgenciesDetailModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    AgenciesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AgenciesModule { }
