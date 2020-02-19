import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFileUrlComponent } from 'app/shared/components/dialog/input-file-url/input-file-url.component';
import { FirebaseService } from 'app/core/services/api/firebase.service';

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

  links = [];

  constructor(
    private firebase: FirebaseService,
    public dialogService: DialogService
  ) {
  }

  uploadMedia() {
    const ref = this.dialogService.open(InputFileUrlComponent, {
      data: this.options,
      header: 'Media Panel',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'}
    });

    ref.onClose.subscribe(data => {
      if (data !== undefined) {
        if (this.options.multiple) {
          this.onChange([...this.links, ...data]);
          this.links = [...this.links, ...data];
        } else {
          if (this.links[0] && this.links[0].url && this.links[0].url.indexOf('firebasestorage.googleapis.com') >= 0) {
            this.firebase.addDownloadUrls(this.links[0].url);
          }
          this.onChange(data[0]);
          this.links = data;
        }
      }
    });
  }

  removeMedia(item, i) {
    if (item && item.url && item.url.indexOf('firebasestorage.googleapis.com') >= 0) {
      this.firebase.addDownloadUrls(item.url);
    }
    this.links.splice(i, 1);
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  writeValue( value ) {
    if (value) {
      if (this.options.multiple) {
        this.links = value;
      } else {
        this.links.push(value);
      }
    }
  }
}
