import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Article } from 'app/core/model/article.model';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Category, CategoryTypeEnum } from 'app/core/model/category.model';
import { CategoryForm } from './categories-list.data';
import { ReactiveFormComponent } from '@theflames/reactive-form';
import { CommonService } from 'app/core/services/common.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  configForm = new CategoryForm();
  currentCategory: any;
  display: boolean;
  categories: Category[];
  @ViewChild('menu', {static: false}) menu: ElementRef;
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;

  constructor(
    private firebase: FirebaseService,
    private common: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private routes: ActivatedRoute
  ) {
    this.items = [
      {
        id: 'edit',
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: e => this.categoryAction(e)
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: e => this.categoryAction(e)
      }
    ];
  }

  ngOnInit() {
    const collections = this.common.collections$.value.map(x => ({value: x.id, text: x.name}));
    this.configForm.generateForm(collections);
    this.listCategories();
    this.cols = [
      { field: 'type', header: 'Loại danh mục' },
      { field: 'name', header: 'Tên Danh mục' },
      { field: 'key', header: 'Khóa danh mục' }
    ];
  }

  categoryAction (e) {
    if (e.item.id === 'edit') {
      this.display = true;
      this.formComp.form.patchValue(this.currentCategory);
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa danh mục này?',
        accept: () => {
          this.firebase.deleteRecord('categories', this.currentCategory.id).then(res => {
            this.categories = this.categories.filter((x: any) => x.id !== this.currentCategory.id);
          }).catch(error => {
            console.log(error);
          });
        }
      });
    }
  }

  listCategories() {
    this.firebase.listRecords('categories').then(data => {
      this.categories = this.firebase.convertRecord(data).sort((a, b) => {
        const aType = `${a.type}${a.key}`;
        const bType = `${b.type}${b.key}`;
        return aType > bType ? 1 : -1;
      });
      console.log(this.categories);
      this.common.categories$.next(this.categories);
    });
  }

  onSubmit(event) {
    if (this.formComp.form.valid) {
      if (event.id) {
        this.firebase.editRecord('categories', event.id, event).then(data => {
          this.display = false;
          this.messageService.add({severity: 'success', summary: 'Sửa danh mục thành công', detail: ''});
          this.listCategories();
        });
      } else {
        this.firebase.createRecord('categories', event).then(data => {
          this.display = false;
          this.messageService.add({severity: 'success', summary: 'Tạo danh mục thành công', detail: ''});
          this.listCategories();
        });
      }
    }
  }

  openModal() {
    this.display = true;
    this.formComp.form.reset();
  }

  handleAction(data, $event) {
    this.currentCategory = data;
    const menu: any = this.menu;
    menu.toggle($event);
  }

}
