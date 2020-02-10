import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/components/common/shared';
import { ArticlesComponent } from './articles.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    data: {
      breadcrumb: 'Bài viết'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('./articles-list/articles-list.module').then(m => m.ArticlesListModule)
      },
      {
        path: 'new',
        data: {
          breadcrumb: 'Tạo bài viết'
        },
        loadChildren: () => import('./articles-new-edit/articles-new-edit.module').then(m => m.ArticlesNewEditModule)
      },
      {
        path: ':id/edit',
        data: {
          breadcrumb: 'Sửa bài viết'
        },
        loadChildren: () => import('./articles-new-edit/articles-new-edit.module').then(m => m.ArticlesNewEditModule)
      }
    ]
  },
];

@NgModule({
  declarations: [
    ArticlesComponent
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
export class ArticlesModule { }
