import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    FormsModule,
  ],
  exports: [
    PaginationComponent
  ],
  entryComponents: [
    PaginationComponent
  ]
})
export class PaginationModule {
}
