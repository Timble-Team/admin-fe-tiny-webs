import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Album } from 'app/core/model/album.model';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
})
export class AlbumsListComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  currentId: any;
  categories = [];
  albums: Album[] = [];
  totalRecords = 0;
  lastDoc: any;
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
        command: e => this.albumAction(e)
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: e => this.albumAction(e)
      }
    ];
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Tên album' },
      { field: 'desc', header: 'Mô tả' },
      { field: 'total', header: 'Tổng ảnh' },
      { field: 'kind', header: 'Danh mục' },
      { field: 'createdAt', header: 'Ngày tạo' },
      { field: 'public', header: 'Công Khai' }
    ];
    this.getCategoriesAndAlbums();
  }

  getCategoriesAndAlbums() {
    this.firebase.listRecords('Category', {key: 'type', value: 'Album', compared: '=='}).then(dataCat => {
      this.categories = this.firebase.convertRecord(dataCat);
      this.getAlbums();
    });
  }

  getAlbums() {
    this.firebase.listPublicRecords('Album', undefined, undefined, undefined, this.lastDoc).then(data => {
      const albums = this.firebase.convertRecord(data).map((x: any) => {
        const nameObj = this.categories.find(cat => +cat.key === +x.kind);
        x.total = x.photos.length;
        x.kind = nameObj ? nameObj.name : 'undefined';
        return x;
      });
      this.albums = [...this.albums, ...albums];
      this.lastDoc = data.docs[data.docs.length - 1];
    });
  }

  albumAction (e) {
    if (e.item.id === 'edit') {
      this.router.navigate([this.currentId, 'edit'], {relativeTo: this.routes});
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa bài viết này?',
        accept: () => {
          this.firebase.editRecord('Article', this.currentId, {deletedAt: new Date()}).then(res => {
            this.albums = this.albums.filter((x: any) => x.id !== this.currentId);
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
