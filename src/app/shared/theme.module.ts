import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputFileUrlComponent } from './components/dialog/input-file-url/input-file-url.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ToggleButtonModule } from './components/custom-form/toggle-button/toggle-button.module';
import { FormCkeditorModule } from './components/custom-form/form-ckeditor/form-ckeditor.module';
import {FileUploadModule} from 'primeng/fileupload';
import { MediaPickerModule } from './components/custom-form/media-picker/media-picker.module';
import { CardModule } from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { FormDropdownModule } from './components/custom-form/dropdown/dropdown.module';

const COMPONENTS = [
  InputFileUrlComponent,
];

const ENTRY_COMPONENTS = [
  InputFileUrlComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    CKEditorModule,
    CardModule,
    MessageModule,
    InputTextModule,
    ButtonModule,
    FormDropdownModule,
    ToggleButtonModule,
    MediaPickerModule,
    FormCkeditorModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS]
})

export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule
    };
  }
}
