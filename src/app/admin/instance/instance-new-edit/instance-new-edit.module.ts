import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/components/shared.module';
import { FormsModule } from '@angular/forms';
import { FormCkeditorModule } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.module';
import { InstanceNewEditResolver } from './instance-new-edit.resolver';
import { InstanceNewEditComponent } from './instance-new-edit.component';
import { DynamicObjectModule } from 'app/shared/components/dynamic-object/dynamic-object.module';
import { CanDeactivateGuard } from 'app/core/services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    resolve: {
      resolverData: InstanceNewEditResolver
    },
    canDeactivate: [CanDeactivateGuard],
    component: InstanceNewEditComponent
  },
];

@NgModule({
  declarations: [
    InstanceNewEditComponent
  ],
  imports: [
    CommonModule,
    FormCkeditorModule,
    FormsModule,
    SharedModule,
    DynamicObjectModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    InstanceNewEditResolver
  ]
})
export class InstanceNewEditModule { }
