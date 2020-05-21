import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ReactiveFormService, ReactiveFormComponent } from '@theflames/reactive-form';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { DynamicObjectNewEditComponent } from 'app/shared/components/dynamic-object/dynamic-object-new-edit/dynamic-object-new-edit.component';

@Component({
  selector: 'app-instance-new-edit',
  templateUrl: './instance-new-edit.component.html'
})
export class InstanceNewEditComponent implements OnInit {
  configForm: any;
  text2: any;
  instance: any;
  editRecord = false;
  objectLabel: string;
  objectName: string;

  @ViewChild(DynamicObjectNewEditComponent, {static: false}) dynamicObjectNewEditComp: DynamicObjectNewEditComponent;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(instanceSlug => {
      this.instance = this.route.snapshot.data.resolverData.instance;
      this.configForm = this.route.snapshot.data.resolverData.form;
      this.objectLabel = JSON.parse(localStorage.getItem('CUR_COLLECTION')).name;
      this.objectName = this.route.snapshot.data.resolverData.objectName;
    });
  }

  canDeactivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.dynamicObjectNewEditComp.offDeactive) {
        const confirmation = window.confirm('Are you sure?');
        resolve(confirmation);
      } else {
        resolve(true);
      }
    });
  }
}
