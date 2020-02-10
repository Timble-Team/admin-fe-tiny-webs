import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/components/common/shared';
import { AlbumsComponent } from './albums.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumsComponent,
    data: {
      breadcrumb: 'Album'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('./albums-list/albums-list.module').then(m => m.AlbumsListModule)
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'Tạo Album'
        },
        loadChildren: () => import('./albums-new-edit/albums-new-edit.module').then(m => m.AlbumsNewEditModule)
      },
      {
        path: ':id/edit',
        data: {
          breadcrumb: 'Sửa Album'
        },
        loadChildren: () => import('./albums-new-edit/albums-new-edit.module').then(m => m.AlbumsNewEditModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    AlbumsComponent
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
export class AlbumsModule { }
