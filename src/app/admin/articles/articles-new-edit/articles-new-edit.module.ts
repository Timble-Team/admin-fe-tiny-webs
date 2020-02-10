import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesNewEditComponent } from './articles-new-edit.component';
import { SharedModule } from 'app/shared/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ArticlesNewEditComponent
  },
];

@NgModule({
  declarations: [
    ArticlesNewEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ArticlesNewEditModule { }
