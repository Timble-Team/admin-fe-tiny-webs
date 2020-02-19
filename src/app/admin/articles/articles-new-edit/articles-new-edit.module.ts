import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesNewEditComponent } from './articles-new-edit.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { FormsModule } from '@angular/forms';
import { FormCkeditorModule } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.module';
import { ArticlesEditResolver } from './articles-new-edit.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      resolverData: ArticlesEditResolver
    },
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
  ],
  providers: [
    ArticlesEditResolver
  ]
})
export class ArticlesNewEditModule { }
