import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Category, CategoryTypeEnum } from 'app/core/model/category.model';
import { UsersForm } from './users-list.data';
import { ReactiveFormComponent, ReactiveFormService } from '@theflames/reactive-form';
import { CommonService } from 'app/core/services/common.service';
import { AdminEnum } from 'app/shared/enum/admin.enum';
import { FormDropdownComponent } from 'app/shared/components/custom-form/dropdown/dropdown.component';
import { MainAppStoreFactoryService } from 'app/core/services/api/firebase.factory';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})

export class UsersComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  configForm = new UsersForm();
  currentCategory: any;
  display: boolean;
  users: any[];
  AdminEnum = AdminEnum;
  @ViewChild('menu', {static: false}) menu: ElementRef;
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;

  constructor(
    private firebase: FirebaseService,
    private common: CommonService,
    private appStore: MainAppStoreFactoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reactiveService: ReactiveFormService
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
    this.reactiveService.setCustomComponents({
      dropdown: FormDropdownComponent
    });
    this.configForm.generateForm();
    this.listUsers();
    this.cols = [
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Vai trò' }
    ];
  }

  categoryAction (e) {
    if (e.item.id === 'edit') {
      this.display = true;
      this.formComp.form.patchValue(this.currentCategory);
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa user này?',
        accept: () => {
          this.firebase.deleteRecord('users', this.currentCategory.id).then(res => {
            this.users = this.users.filter((x: any) => x.id !== this.currentCategory.id);
          }).catch(error => {
            console.log(error);
          });
        }
      });
    }
  }

  listUsers() {
    this.firebase.listRecords('users').then(data => {
      this.users = this.firebase.convertRecord(data);
    });
  }

  onSubmit(event) {
    if (this.formComp.form.valid) {
      if (event.id) {
        this.firebase.editRecord('users', event.id, event).then(data => {
          this.display = false;
          this.messageService.add({severity: 'success', summary: 'Sửa user thành công', detail: ''});
          this.listUsers();
        });
      } else {
        const eventWithAgency = {
          ...event,
          agencies: [
            this.appStore.doc(`/agencies/${localStorage.getItem('AGENCY_ID')}`).ref
          ]
        };
        this.appStore.collection('users').add(eventWithAgency).then(appData => {
          this.display = false;
          this.messageService.add({severity: 'success', summary: 'Tạo user thành công', detail: ''});
          this.listUsers();
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
