import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormDropdownComponent } from './dropdown.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    FormDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    FormDropdownComponent
  ]
})
export class FormDropdownModule {
}
