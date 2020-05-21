import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-object-list',
  templateUrl: './dynamic-object-list.component.html',
})
export class DynamicObjectListComponent implements OnInit {
  currentId: any;
  items: MenuItem[];
  @ViewChild('menu', {static: false}) menu: ElementRef;
  @Input() cols: any[] = [];
  @Input() menuItems: MenuItem[] = [];
  @Input() objectName: string;
  @Input() objectLabel: String = 'đối tượng';
  @Input() instances: any[];
  @Input() categories: any[];
  lastDoc: any;
  loadMore: boolean = false;

  constructor(
    private firebase: FirebaseService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private routes: ActivatedRoute
  ) {
    this.items = [
      ...this.menuItems,
      {
        id: 'edit',
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        command: e => this.instanceAction(e)
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: e => this.instanceAction(e)
      }
    ];
  }

  // capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  ngOnInit() {
    console.log(this.instances);
  }

  instanceAction (e) {
    if (e.item.id === 'edit') {
      this.router.navigate([this.currentId, 'edit'], {relativeTo: this.routes});
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: `Bạn muốn xóa ${this.objectLabel} này?`,
        accept: () => {
          this.firebase.editRecord(this.objectName, this.currentId, {deletedAt: new Date()}).then(res => {
            this.instances = this.instances.filter((x: any) => x.id !== this.currentId);
          }).catch(error => {
            console.log(error);
          });
        }
      });
    }
  }

  getInstances() {
    this.firebase.listPaginationRecords(this.objectName, undefined, undefined, undefined, this.lastDoc).then(data => {
      const instances = this.firebase.convertRecord(data).map((x: any) => {
        const nameObj = this.categories.find(cat => +cat.key === +x.kind);
        x.total = x.photos.length;
        x.kind = nameObj ? nameObj.name : 'undefined';
        return x;
      });
      this.loadMore = this.instances.length === this.firebase.LIMIT_RECORDS;
      this.instances = [...this.instances, ...instances];
      this.lastDoc = data.docs[data.docs.length - 1];
    });
  }

  handleAction(index, $event) {
    this.currentId = index;
    const menu: any = this.menu;
    menu.toggle($event);
  }

}
