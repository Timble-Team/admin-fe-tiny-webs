import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsNewEditComponent } from './albums-new-edit.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { AlbumEditResolver } from './albums-new-edit.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      resolverData: AlbumEditResolver
    },
    component: AlbumsNewEditComponent
  },
];

@NgModule({
  declarations: [
    AlbumsNewEditComponent
  ],
  providers: [
    AlbumEditResolver
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class AlbumsNewEditModule { }
