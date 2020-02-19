import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/components/common/shared';
import { VideosComponent } from './videos.component';

const routes: Routes = [
  {
    path: '',
    component: VideosComponent,
    data: {
      breadcrumb: 'Video'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('./videos-list/videos-list.module').then(m => m.VideosListModule)
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'Tạo Video'
        },
        loadChildren: () => import('./videos-new-edit/videos-new-edit.module').then(m => m.VideosNewEditModule)
      },
      {
        path: ':id/edit',
        data: {
          breadcrumb: 'Sửa Video'
        },
        loadChildren: () => import('./videos-new-edit/videos-new-edit.module').then(m => m.VideosNewEditModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    VideosComponent
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
export class VideosModule { }
