import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsListComponent } from './albums-list.component';
import { SharedModule } from 'app/shared/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AlbumsListComponent
  },
];

@NgModule({
  declarations: [
    AlbumsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AlbumsListModule { }
