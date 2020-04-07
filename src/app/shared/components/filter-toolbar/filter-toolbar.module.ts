import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FilterToolbarComponent } from './filter-toolbar.component';
import { ToolbarModule } from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  declarations: [
    FilterToolbarComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    SplitButtonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  exports: [
    FilterToolbarComponent
  ],
  entryComponents: [
    FilterToolbarComponent
  ]
})
export class FilterToolbarModule {
}
