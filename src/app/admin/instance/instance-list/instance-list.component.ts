import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instance-list',
  templateUrl: './instance-list.component.html',
})
export class InstanceListComponent implements OnInit {
  cols: any[];
  items: MenuItem[];
  currentId: any;
  instances: any[];
  objectName: string;
  objectLabel: string;
  categories = [];
  additionCols = [
    {field: 'content', header: 'Độ dài nội dung (ký tự)'}
  ];
  // replace(/<(?:.|\n)*?>/gm, '').replace(/(\r\n|\n|\r)/gm,"").replace('&nbsp;','');
  @ViewChild('menu', {static: false}) menu: ElementRef;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(instanceSlug => {
      this.instances = this.route.snapshot.data.resolverData.instances;
      this.cols = this.route.snapshot.data.resolverData.cols;
      this.objectName = this.route.snapshot.data.resolverData.objectName;
      this.categories = this.route.snapshot.data.resolverData.categories;
      this.objectLabel = JSON.parse(localStorage.getItem('CUR_COLLECTION')).name;
    });
  }

}
