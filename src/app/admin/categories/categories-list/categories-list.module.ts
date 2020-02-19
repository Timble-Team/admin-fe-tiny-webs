import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { ReactiveFormModule } from '@theflames/reactive-form';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent
  },
];

@NgModule({
  declarations: [
    CategoriesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormModule,
    RouterModule.forChild(routes),
  ]
})
export class CategoriesListModule { }
