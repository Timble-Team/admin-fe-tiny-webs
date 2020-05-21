import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { ReactiveFormModule } from '@theflames/reactive-form';
import { SharedModule } from 'app/shared/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    // data: {
    //   breadcrumb: 'Danh mục'
    // },
  },
];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersModule { }
