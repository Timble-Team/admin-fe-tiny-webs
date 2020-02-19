import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TemplateFormComponent } from '@theflames/reactive-form';
import { DialogService } from 'primeng/api';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFileUrlComponent } from 'app/shared/components/dialog/input-file-url/input-file-url.component';

@Component({
  selector: 'app-ckeditor',
  templateUrl: './custom-ckeditor.component.html',
  providers: [
    // DialogService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomCkeditorComponent,
      multi: true
    }
  ]
})

export class CustomCkeditorComponent {
  @Input() options: any;
  @ViewChild('myckeditor', { static: false }) myckeditor: any;

  onChange: Function;
  ckeConfig: any;
  content: any;

  constructor(
    public dialogService: DialogService
  ) {
    this.ckeConfig = {
      defaultLanguage: 'en',
      language: 'en',
      // tslint:disable-next-line:max-line-length
      removePlugins: 'copyformatting,removeformat,forms,elementspath,save,flash,iframe,link,scayt,tabletools,tableselection,find,pagebreak,templates,about,maximize,showblocks,newpage,language',
      // tslint:disable-next-line:max-line-length
      removeButtons: 'Image,Font,Styles,HorizontalRule,Indent,Outdent,Source,SpellChecker,Preview,Copy,Cut,Paste,Undo,Redo,Print,Form,TextField,Textarea,Button,SelectAll,NumberedList,BulletedList,CreateDiv,Table,PasteText,PasteFromWord,Select,HiddenField',
      allowedContent: false,
      contentsCss: ['img {width: 500px}'],
      // format_tags: 'div',
      forcePasteAsPlainText: true
    };
  }

  triggerModal() {
    const link = document.getElementById('js-btn-tmp-show-list');
    link.click();
  }

  uploadImg() {
    const ref = this.dialogService.open(InputFileUrlComponent, {
      data: this.options,
      header: 'Media Panel',
      width: '70%',
      contentStyle: {'max-height': '500px', 'overflow': 'auto'}
    });

    ref.onClose.subscribe(link => {
      if (link !== undefined) {
        let imageTag;
        imageTag = this.myckeditor.instance.document.createElement('img');
        imageTag.setAttribute('src', link[0].url);
        this.myckeditor.instance.insertElement(imageTag);
      }
    });
  }

  emitValue(event) {
    this.onChange(event);
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  writeValue( value ) {
    this.content = value;
  }
}
