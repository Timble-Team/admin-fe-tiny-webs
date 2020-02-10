import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/components/shared.module';
import { AgenciesNewEditComponent } from './agencies-new-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AgenciesNewEditComponent
  },
];

@NgModule({
  declarations: [
    AgenciesNewEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AgenciesNewEditModule { }
