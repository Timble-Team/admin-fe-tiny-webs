import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewFormModule } from './new-form/new-form.module';
import { EnumPipe } from '../pipe/enum.pipe';
import { PermissionPipe } from '../pipe/permission.pipe';
import { AlertMessageModule } from './alert-message/alert-message.module';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { ReactiveFormModule } from '@theflames/reactive-form';
import {ToastModule} from 'primeng/toast';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import { DateTimePipe } from '../pipe/date.pipe';

const PIPES = [
  EnumPipe,
  DateTimePipe,
  PermissionPipe
];

@NgModule({
  imports: [
    CommonModule,
    AlertMessageModule,
    NewFormModule,
    TableModule,
    FormsModule,
    ReactiveFormModule,
    ConfirmDialogModule,
    ToastModule,
    CardModule,
    TieredMenuModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertMessageModule,
    NewFormModule,
    ConfirmDialogModule,
    TableModule,
    DialogModule,
    TieredMenuModule,
    CommonModule,
    ReactiveFormModule,
    ToastModule,
    ButtonModule,
    CardModule,
    ...PIPES
  ],
  declarations: [
    ...PIPES
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}

