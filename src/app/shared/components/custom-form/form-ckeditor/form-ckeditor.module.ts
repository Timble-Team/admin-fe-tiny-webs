import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormCkeditorComponent } from './form-ckeditor.component';
import { CustomCkeditorComponent } from './custom-ckeditor/custom-ckeditor.component';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    FormCkeditorComponent,
    CustomCkeditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  exports: [
    CustomCkeditorComponent
  ],
  entryComponents: [
    FormCkeditorComponent
  ]
})
export class FormCkeditorModule {
}
