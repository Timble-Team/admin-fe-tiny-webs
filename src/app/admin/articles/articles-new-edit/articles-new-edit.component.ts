import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ArticleForm } from './articles-new-edit.data';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Article } from 'app/core/model/article.model';

@Component({
  selector: 'app-articles-new-edit',
  templateUrl: './articles-new-edit.component.html',
})
export class ArticlesNewEditComponent {
  configForm = new ArticleForm();

  constructor(
    private firebase: FirebaseService
  ) {}

  onSubmit(event) {
    const article = new Article(event).article;
    this.firebase.createRecord('Article', article).then(data => {
      console.log(data);
    });
  }
}
