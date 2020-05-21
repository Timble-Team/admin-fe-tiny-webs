import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { ReactiveFormService, ReactiveFormComponent } from '@theflames/reactive-form';
import { FormCkeditorComponent } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.component';
import { ToggleButtonComponent } from 'app/shared/components/custom-form/toggle-button/toggle-button.component';
import { MediaPickerComponent } from 'app/shared/components/custom-form/media-picker/media-picker.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormDropdownComponent } from 'app/shared/components/custom-form/dropdown/dropdown.component';
import { CommonService } from 'app/core/services/common.service';
import { InitialObject } from 'app/core/model/initObject.model';
import { FormConfig } from '@theflames/reactive-form/lib/models/form-config.interface';

@Component({
  selector: 'app-dynamic-object-new-edit',
  templateUrl: './dynamic-object-new-edit.component.html'
})
export class DynamicObjectNewEditComponent implements OnInit, AfterViewInit, OnDestroy {
  editRecord = false;
  keysSource = [];
  offDeactive = false;

  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;
  @Input() objectName: string;
  @Input() objectLabel: String = 'đối tượng';
  @Input() objectValue: any;
  @Input() configForm: FormConfig;

  constructor(
    private common: CommonService,
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private reactiveService: ReactiveFormService
  ) {
    this.reactiveService.setCustomComponents({
      ckeditor: FormCkeditorComponent,
      switcher: ToggleButtonComponent,
      mediapicker: MediaPickerComponent,
      dropdown: FormDropdownComponent
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.objectValue) {
      this.formComp.form.patchValue(this.objectValue);
    }
    this.cd.detectChanges();
  }

  getKeysUploadSource() {
    this.keysSource = this.configForm.config.filter(x => x.inputType.name === 'mediapicker').map(x => x.key);
  }

  // capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  create() {
    this.formComp.handleSubmit(null);
  }

  navigation() {
    this.router.navigate([`/${this.objectName}`]);
  }

  onSubmit(event) {
    this.getKeysUploadSource();
    if (this.objectValue) {
      this.common.setLoading(true, 'Uploading Source!');
      this.firebase.uploadFileStorage(event, this.keysSource, `${this.objectName.toLowerCase()}/${this.objectValue.id}`).then(result => {
        this.common.setLoading(true, `Updating ${this.objectName}!`);
        this.firebase.editRecord(this.objectName, this.objectValue.id, result).then(data => {
          this.offDeactive = true;
          this.editRecord = true;
          this.firebase.deleteFileStorageAsync();
          this.common.setLoading(false);
          this.messageService.add({severity: 'success', summary: `Sửa ${this.objectLabel} thành công`, detail: `Về danh sách ${this.objectLabel}`});
          this.router.navigate([`/${this.objectName.toLowerCase()}`]);
        });
      });
    } else {
      const objectInstance = new InitialObject(event, this.keysSource).obj;
      this.common.setLoading(true, `Creating ${this.objectName}!`);
      this.firebase.createRecord(this.objectName, objectInstance).then(data => {
        this.common.setLoading(true, 'Uploading Source!');
        this.firebase.uploadFileStorage(event, this.keysSource, `${this.objectName.toLowerCase()}/${data.id}`).then(result => {
          this.common.setLoading(true, 'Mapping Source!');
          this.firebase.editRecord(this.objectName, data.id, result).then(data => {
            this.offDeactive = true;
            this.common.setLoading(false);
            this.router.navigate([`/${this.objectName.toLowerCase()}`]);
            this.messageService.add({severity: 'success', summary: `Tạo ${this.objectLabel} thành công`, detail: `Về danh sách ${this.objectLabel}`});
          });
        });
      });
    }
  }

  ngOnDestroy() {
    if (!this.editRecord) {
      this.firebase.resetDownloadUrls();
    }
  }
}
