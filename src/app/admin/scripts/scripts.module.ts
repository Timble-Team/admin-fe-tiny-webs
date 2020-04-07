import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ScriptsComponent } from './scripts.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/components/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ScriptsComponent,
    data: {
      breadcrumb: 'scripts'
    }
  }
];

@NgModule({
  declarations: [
    ScriptsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ScriptsModule { }
