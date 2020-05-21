import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InstanceListComponent } from './instance-list.component';
import { SharedModule } from 'app/shared/components/shared.module';
import { InstanceListResolver } from './instance-list.resolver';
import { DynamicObjectModule } from 'app/shared/components/dynamic-object/dynamic-object.module';

const routes: Routes = [
  {
    path: '',
    resolve: {
      resolverData: InstanceListResolver
    },
    component: InstanceListComponent
  },
];

@NgModule({
  declarations: [
    InstanceListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DynamicObjectModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    InstanceListResolver
  ]
})
export class InstanceListModule { }
