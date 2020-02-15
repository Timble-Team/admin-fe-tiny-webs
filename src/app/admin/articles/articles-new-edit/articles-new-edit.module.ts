import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesNewEditComponent } from './articles-new-edit.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { FormsModule } from '@angular/forms';
import { FormCkeditorModule } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.module';

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
    FormCkeditorModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class ArticlesNewEditModule { }
