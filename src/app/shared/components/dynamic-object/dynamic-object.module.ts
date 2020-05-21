import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/components/shared.module';
import { FormsModule } from '@angular/forms';
import { FormCkeditorModule } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.module';
import { DynamicObjectNewEditComponent } from './dynamic-object-new-edit/dynamic-object-new-edit.component';
import { DynamicObjectListComponent } from './dynamic-object-list/dynamic-object-list.component';


@NgModule({
  declarations: [
    DynamicObjectNewEditComponent,
    DynamicObjectListComponent
  ],
  exports: [
    DynamicObjectNewEditComponent,
    DynamicObjectListComponent
  ],
  imports: [
    CommonModule,
    FormCkeditorModule,
    FormsModule,
    SharedModule,
  ]
})
export class DynamicObjectModule { }
