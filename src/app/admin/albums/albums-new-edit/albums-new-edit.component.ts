import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ArticleForm } from 'app/admin/articles/articles-new-edit/articles-new-edit.data';
import { ReactiveFormComponent, ReactiveFormService } from '@theflames/reactive-form';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToggleButtonComponent } from 'app/shared/components/custom-form/toggle-button/toggle-button.component';
import { MediaPickerComponent } from 'app/shared/components/custom-form/media-picker/media-picker.component';
import { Album } from 'app/core/model/album.model';
import { AlbumForm } from './albums-new-edit.data';
import { FormDropdownComponent } from 'app/shared/components/custom-form/dropdown/dropdown.component';
import { CommonService } from 'app/core/services/common.service';

@Component({
  selector: 'app-albums-new-edit',
  templateUrl: './albums-new-edit.component.html',
})
export class AlbumsNewEditComponent implements OnInit, AfterViewInit, OnDestroy {
  configForm: any;
  album: any;
  editRecord = false;
  categories = [];
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;

  constructor(
    private firebase: FirebaseService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private common: CommonService,
    private messageService: MessageService,
    private router: Router,
    private reactiveService: ReactiveFormService
  ) {
    this.reactiveService.setCustomComponents({
      switcher: ToggleButtonComponent,
      mediapicker: MediaPickerComponent,
      dropdown: FormDropdownComponent
    });
  }

  ngOnInit() {
    this.album = this.route.snapshot.data.resolverData.album;
    this.categories = this.route.snapshot.data.resolverData.categories;
    this.configForm = new AlbumForm(this.categories);
  }

  ngAfterViewInit() {
    if (this.album) {
      this.formComp.form.patchValue(this.album);
    }
    this.cd.detectChanges();
  }

  create() {
    this.formComp.handleSubmit(null);
  }

  onSubmit(event) {
    if (this.formComp.valid) {
      this.common.setLoading(true, 'Uploading Photos!');
      this.firebase.uploadFileStorage(event, ['cover', 'photos'], 'pictures/albums').then(result => {
        this.common.setLoading(true, 'Creating Album!');
        const album = new Album(result).album;
        if (this.album) {
          this.firebase.editRecord('Album', this.album.id, album).then(data => {
            this.editRecord = true;
            this.firebase.deleteFileStorageAsync();
            this.common.setLoading(false);
            this.messageService.add({severity: 'success', summary: 'Sửa album thành công', detail: 'Về danh sách album'});
            this.router.navigate(['/albums']);
          });
        } else {
          this.firebase.createRecord('Album', album).then(data => {
            this.common.setLoading(false);
            this.router.navigate(['/albums']);
            this.messageService.add({severity: 'success', summary: 'Tạo album thành công', detail: 'Về danh sách album'});
          });
        }
      });
    }
  }

  ngOnDestroy() {
    if (!this.editRecord) {
      this.firebase.resetDownloadUrls();
    }
  }
}
