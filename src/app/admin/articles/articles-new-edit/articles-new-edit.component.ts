import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ArticleForm } from './articles-new-edit.data';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Article } from 'app/core/model/article.model';
import { ReactiveFormService, ReactiveFormComponent } from '@theflames/reactive-form';
import { FormCkeditorComponent } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.component';
import { ToggleButtonComponent } from 'app/shared/components/custom-form/toggle-button/toggle-button.component';
import { MediaPickerComponent } from 'app/shared/components/custom-form/media-picker/media-picker.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormDropdownComponent } from 'app/shared/components/custom-form/dropdown/dropdown.component';
import { CommonService } from 'app/core/services/common.service';

@Component({
  selector: 'app-articles-new-edit',
  templateUrl: './articles-new-edit.component.html'
})
export class ArticlesNewEditComponent implements OnInit, AfterViewInit, OnDestroy {
  configForm: any;
  text2: any;
  article: any;
  categories = [];
  editRecord = false;

  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;


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
    this.article = this.route.snapshot.data.resolverData.article;
    this.categories = this.route.snapshot.data.resolverData.categories;
    this.configForm = new ArticleForm(this.categories);
  }

  ngAfterViewInit() {
    if (this.article) {
      this.formComp.form.patchValue(this.article);
    }
    this.cd.detectChanges();
  }

  onSubmit(event) {
    if (this.formComp.form.valid) {
      this.common.setLoading(true, 'Uploading Source!');
      this.firebase.uploadFileStorage(event, ['cover', 'attachments'], 'pictures/articles').then(result => {
        this.common.setLoading(true, 'Creating Article!');
        const article = new Article(result).article;
        if (this.article) {
          this.firebase.editRecord('Article', this.article.id, article).then(data => {
            this.editRecord = true;
            this.firebase.deleteFileStorageAsync();
            this.common.setLoading(false);
            this.messageService.add({severity: 'success', summary: 'Sửa bài viết thành công', detail: 'Về danh sách bài viết'});
            this.router.navigate(['/articles']);
          });
        } else {
          this.firebase.createRecord('Article', article).then(data => {
            this.common.setLoading(false);
            this.router.navigate(['/articles']);
            this.messageService.add({severity: 'success', summary: 'Tạo bài viết thành công', detail: 'Về danh sách bài viết'});
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
