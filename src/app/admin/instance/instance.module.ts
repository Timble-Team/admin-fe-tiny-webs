import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/components/common/shared';
import { InstanceComponent } from './instance.component';

// const instanceName = JSON.parse(localStorage.getItem('CUR_COLLECTION')).name[localStorage.getItem('lang')].toLowerCase();

const routes: Routes = [
  {
    path: '',
    component: InstanceComponent,
    // data: {
    //   breadcrumb: instanceName
    // },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('./instance-list/instance-list.module').then(m => m.InstanceListModule)
      },
      {
        path: 'new',
        // data: {
        //   breadcrumb: `Tạo ${instanceName}`
        // },
        loadChildren: () => import('./instance-new-edit/instance-new-edit.module').then(m => m.InstanceNewEditModule)
      },
      {
        path: ':id/edit',
        // data: {
        //   breadcrumb: `Sửa ${instanceName}`
        // },
        loadChildren: () => import('./instance-new-edit/instance-new-edit.module').then(m => m.InstanceNewEditModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    InstanceComponent
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
export class InstanceModule { }
