import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Video } from 'app/core/model/video.model';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
})
export class VideosListComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  currentId: any;
  categories = [];
  videos: Video[];
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
        command: e => this.videoAction(e)
      },
      {
        id: 'delete',
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
        command: e => this.videoAction(e)
      }
    ];
  }

  ngOnInit() {
    this.firebase.listPublicRecords('Video').then(data => {
      this.firebase.listRecords('Category', {key: 'type', value: 'Video', compared: '=='}).then(dataCat => {
        this.categories = this.firebase.convertRecord(dataCat);
        this.videos = this.firebase.convertRecord(data).map((x: any) => {
          const nameObj = this.categories.find(cat => +cat.key === +x.kind);
          x.kind = nameObj ? nameObj.name : 'undefined';
          return x;
        });
      });
    });
    this.cols = [
      { field: 'source', header: 'Source' },
      { field: 'name', header: 'Tên video' },
      { field: 'desc', header: 'Mô tả' },
      { field: 'kind', header: 'Danh mục' },
      { field: 'createdAt', header: 'Ngày tạo' },
      { field: 'public', header: 'Công Khai' }
    ];
  }

  videoAction (e) {
    if (e.item.id === 'edit') {
      this.router.navigate([this.currentId, 'edit'], {relativeTo: this.routes});
    } else if (e.item.id === 'delete') {
      this.confirmationService.confirm({
        message: 'Bạn muốn xóa video này?',
        accept: () => {
          this.firebase.editRecord('Video', this.currentId, {deletedAt: new Date()}).then(res => {
            this.videos = this.videos.filter((x: any) => x.id !== this.currentId);
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
