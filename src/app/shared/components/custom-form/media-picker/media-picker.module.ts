import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MediaPickerComponent } from './media-picker.component';
import { CustomMediaPickerComponent } from './custom-media-picker/custom-media-picker.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MediaPickerComponent,
    CustomMediaPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    MediaPickerComponent
  ]
})
export class MediaPickerModule {
}
