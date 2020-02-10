import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Agency } from 'app/core/model/agency.model';
import { ApiService } from 'app/core/services/api/api.service';
import {MenuItem, MessageService, ConfirmationService} from 'primeng/api';
import { AgencyForm } from './agencies-list.data';
import { ReactiveFormComponent } from '@theflames/reactive-form';


@Component({
  selector: 'app-agencies-list',
  templateUrl: './agencies-list.component.html',
})
export class AgenciesListComponent implements OnInit {
  @ViewChild('menu', {static: false}) menu: ElementRef;
  @ViewChild(ReactiveFormComponent, {static: false}) formComp: ReactiveFormComponent;


  agencies: Agency[];
  cols: any[];
  items: MenuItem[];
  display: Boolean;
  configForm = new AgencyForm();
  currentItem: Agency;

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Tên Đơn vị' },
      { field: 'domain', header: 'Domain' },
      { field: 'phone', header: 'SĐT' },
      { field: 'address', header: 'Địa chỉ' },
      { field: 'public', header: 'Công Khai' },
      { field: 'expireDate', header: 'Ngày hết hạn' },
    ];
    this.api.get(['agencys/all']).subscribe((res: Agency[]) => {
      this.agencies = res;
    });
    this.items = [
      {
        id: 'user',
        label: 'Add User',
        icon: 'pi pi-fw pi-user',
        command: e => this.takeAction(e)
      },
      {
        id: 'edit',
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: e => this.takeAction(e)
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: e => this.takeAction(e)
      }
    ];
  }

  handleAction(index, $event) {
    this.currentItem = this.agencies[index];
    const menu: any = this.menu;
    menu.toggle($event);
  }

  onSubmit(event) {
    this.api.post(['users'], event).subscribe(res => {
      this.display = false;
      this.messageService.add({severity: 'success', summary: 'Tạo user thành công', detail: `đơn vị ${this.currentItem.name}`});
    });
  }

  takeAction(e) {
    if (e.item.id === 'user') {
      this.display = true;
      this.formComp.form.patchValue({agencyId: this.currentItem._id});
    } else if (e.item.id === 'edit') {
      this.router.navigate([this.currentItem._id]);
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa đơn vị này?',
        accept: () => {
          this.api.delete(['agencys', this.currentItem._id, 'soft']).subscribe(res => {
            this.messageService.add({severity: 'success', summary: 'Xóa đơn vị thành công', detail: ''});
          });
        }
      });
    }
  }

}
