import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/components/common/shared';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    data: {
      breadcrumb: 'Danh mục'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        loadChildren: () => import('./categories-list/categories-list.module').then(m => m.CategoriesListModule)
      },
      // {
      //   path: 'new',
      //   data: {
      //     breadcrumb: 'Tạo bài viết'
      //   },
      //   loadChildren: () => import('./categories-new-edit/categories-new-edit.module').then(m => m.CategoriesNewEditModule)
      // },
      // {
      //   path: ':id/edit',
      //   data: {
      //     breadcrumb: 'Sửa bài viết'
      //   },
      //   loadChildren: () => import('./categories-new-edit/articles-new-edit.module').then(m => m.ArticlesNewEditModule)
      // }
    ]
  },
];

@NgModule({
  declarations: [
    CategoriesComponent
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
export class CategoriesModule { }
