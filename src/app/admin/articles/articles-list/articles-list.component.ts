import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Article } from 'app/core/model/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
})
export class ArticlesListComponent implements OnInit {
  cols: any[];
  // items: MenuItem[];
  // display: Boolean;
  // configForm = new AgencyForm();
  // currentItem: Agency;
  articles: Article[];

  constructor(
    private firebase: FirebaseService
  ) {
  }

  ngOnInit() {
    this.firebase.listPublicRecords('Article').then(data => {
      this.articles = this.firebase.convertRecord(data);
      console.log(this.articles);
    });
    this.cols = [
      { field: 'name', header: 'Tên bài viết' },
      { field: 'desc', header: 'Mô tả' },
      { field: 'createdAt', header: 'Ngày tạo' },
      { field: 'public', header: 'Công Khai' }
    ];
  }

}
