import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ArticleForm } from './articles-new-edit.data';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Article } from 'app/core/model/article.model';
import { ReactiveFormService } from '@theflames/reactive-form';
import { FormCkeditorComponent } from 'app/shared/components/custom-form/form-ckeditor/form-ckeditor.component';
import { ToggleButtonComponent } from 'app/shared/components/custom-form/toggle-button/toggle-button.component';
import { MediaPickerComponent } from 'app/shared/components/custom-form/media-picker/media-picker.component';

@Component({
  selector: 'app-articles-new-edit',
  templateUrl: './articles-new-edit.component.html'
})
export class ArticlesNewEditComponent {
  configForm = new ArticleForm();
  text2: any;

  constructor(
    private firebase: FirebaseService,
    private reactiveService: ReactiveFormService
  ) {
    this.reactiveService.setCustomComponents({
      ckeditor: FormCkeditorComponent,
      switcher: ToggleButtonComponent,
      mediapicker: MediaPickerComponent
    });
  }

  onSubmit(event) {
    const article = new Article(event).article;
    this.firebase.createRecord('Article', article).then(data => {
      console.log(data);
    });
  }
}
