import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToggleButtonComponent } from './toggle-button.component';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [
    ToggleButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule
  ],
  entryComponents: [
    ToggleButtonComponent
  ]
})
export class ToggleButtonModule {
}
