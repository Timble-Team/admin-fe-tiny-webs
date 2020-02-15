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
import {InputTextModule} from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

const PIPES = [
  EnumPipe,
  DateTimePipe,
  PermissionPipe
];

@NgModule({
  imports: [
    CommonModule,
    DynamicDialogModule,
    AlertMessageModule,
    NewFormModule,
    TableModule,
    FormsModule,
    ConfirmDialogModule,
    InputSwitchModule,
    ToastModule,
    CardModule,
    TieredMenuModule,
    DialogModule,
    ReactiveFormModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertMessageModule,
    NewFormModule,
    ConfirmDialogModule,
    TableModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormModule,
    DialogModule,
    TieredMenuModule,
    CommonModule,
    ToastModule,
    ButtonModule,
    CardModule,
    ...PIPES
  ],
  declarations: [
    ...PIPES
  ]
})

export class SharedModule {}
