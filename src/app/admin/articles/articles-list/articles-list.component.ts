import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Article } from 'app/core/model/article.model';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
})
export class ArticlesListComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  currentId: any;
  // display: Boolean;
  // configForm = new AgencyForm();
  // currentItem: Agency;
  articles: Article[];
  categories = [];
  @ViewChild('menu', {static: false}) menu: ElementRef;

  constructor(
    private firebase: FirebaseService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    this.items = [
      {
        id: 'edit',
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: e => this.articleAction(e)
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: e => this.articleAction(e)
      }
    ];
  }

  ngOnInit() {
    this.firebase.listPublicRecords('Article').then(data => {
      this.firebase.listRecords('Category', {key: 'type', value: 'Article', compared: '=='}).then(dataCat => {
        this.categories = this.firebase.convertRecord(dataCat);
        this.articles = this.firebase.convertRecord(data).map(x => {
          const nameObj = this.categories.find(cat => +cat.key === +x.kind);
          x.kind = nameObj ? nameObj.name : 'undefined';
          return x;
        });
      });
    });
    this.cols = [
      { field: 'name', header: 'Tên bài viết' },
      { field: 'desc', header: 'Mô tả' },
      { field: 'kind', header: 'Danh mục' },
      { field: 'createdAt', header: 'Ngày tạo' },
      { field: 'public', header: 'Công Khai' }
    ];
  }

  articleAction (e) {
    if (e.item.id === 'edit') {
      this.router.navigate([this.currentId, 'edit'], {relativeTo: this.routes});
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa bài viết này?',
        accept: () => {
          this.firebase.editRecord('Article', this.currentId, {deletedAt: new Date()}).then(res => {
            this.articles = this.articles.filter((x: any) => x.id !== this.currentId);
          }).catch(error => {
            console.log(error);
          });
        }
      });
    }
  }

  handleAction(index, $event) {
    this.currentId = index;
    const menu: any = this.menu;
    menu.toggle($event);
  }

}
