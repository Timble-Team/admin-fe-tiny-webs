import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VideosNewEditComponent } from './videos-new-edit.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { VideoEditResolver } from './videos-new-edit.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      resolverData: VideoEditResolver
    },
    component: VideosNewEditComponent
  },
];

@NgModule({
  declarations: [
    VideosNewEditComponent
  ],
  providers: [
    VideoEditResolver
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class VideosNewEditModule { }
