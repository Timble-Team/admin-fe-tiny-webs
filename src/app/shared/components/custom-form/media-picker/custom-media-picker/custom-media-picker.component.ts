import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFileUrlComponent } from 'app/shared/components/dialog/input-file-url/input-file-url.component';

@Component({
  selector: 'app-media-picker',
  templateUrl: './custom-media-picker.component.html',
  providers: [
    // DialogService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomMediaPickerComponent,
      multi: true
    }
  ]
})

export class CustomMediaPickerComponent {
  @Input() options: any;
  onChange: Function;

  link: string;

  constructor(
    public dialogService: DialogService
  ) {
  }

  uploadMedia() {
    const ref = this.dialogService.open(InputFileUrlComponent, {
      data: {
        path: this.options.path
      },
      header: 'Media Panel',
      width: '70%',
      // contentStyle: {'max-height': '350px', 'overflow': 'auto'}
    });

    ref.onClose.subscribe(link => {
      this.link = link;
      this.onChange(link);
    });
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  writeValue( value ) {
  }
}
