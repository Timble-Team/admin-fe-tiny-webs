import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ArticleForm } from 'app/admin/articles/articles-new-edit/articles-new-edit.data';
import { ReactiveFormComponent, ReactiveFormService } from '@theflames/reactive-form';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToggleButtonComponent } from 'app/shared/components/custom-form/toggle-button/toggle-button.component';
import { MediaPickerComponent } from 'app/shared/components/custom-form/media-picker/media-picker.component';
import { Video } from 'app/core/model/video.model';
import { VideoForm } from './videos-new-edit.data';
import { FormDropdownComponent } from 'app/shared/components/custom-form/dropdown/dropdown.component';
import { CommonService } from 'app/core/services/common.service';

@Component({
  selector: 'app-videos-new-edit',
  templateUrl: './videos-new-edit.component.html',
})
export class VideosNewEditComponent implements OnInit, AfterViewInit, OnDestroy {
  configForm: any;
  video: any;
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
    this.video = this.route.snapshot.data.resolverData.video;
    this.categories = this.route.snapshot.data.resolverData.categories;
    this.configForm = new VideoForm(this.categories);
  }

  ngAfterViewInit() {
    if (this.video) {
      this.formComp.form.patchValue(this.video);
    }
    this.cd.detectChanges();
  }

  create() {
    this.formComp.handleSubmit(null);
  }

  onSubmit(event) {
    if (this.formComp.valid) {
      this.common.setLoading(true, 'Uploading Source!');
      this.firebase.uploadFileStorage(event, ['cover', 'source'], 'videos').then(result => {
        this.common.setLoading(true, 'Creating Video!');
        const video = new Video(result).video;
        if (this.video) {
          this.firebase.editRecord('Video', this.video.id, video).then(data => {
            this.editRecord = true;
            this.firebase.deleteFileStorageAsync();
            this.common.setLoading(false);
            this.messageService.add({severity: 'success', summary: 'Sửa video thành công', detail: 'Về danh sách video'});
            this.router.navigate(['/videos']);
          });
        } else {
          this.firebase.createRecord('Video', video).then(data => {
            this.common.setLoading(false);
            this.router.navigate(['/videos']);
            this.messageService.add({severity: 'success', summary: 'Tạo video thành công', detail: 'Về danh sách video'});
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
