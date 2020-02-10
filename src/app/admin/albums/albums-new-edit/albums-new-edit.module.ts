import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsNewEditComponent } from './albums-new-edit.component';
import { SharedModule } from 'app/shared/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AlbumsNewEditComponent
  },
];

@NgModule({
  declarations: [
    AlbumsNewEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AlbumsNewEditModule { }
