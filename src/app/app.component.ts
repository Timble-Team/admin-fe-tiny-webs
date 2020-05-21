import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MainAppStoreFactoryService, MainAppAuthFactoryService } from './core/services/api/firebase.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    private appStore: MainAppStoreFactoryService
  ) {
  }

  ngOnInit () {
    this.appStore.collection('test').get().subscribe(data => {
      console.log(data);
    });
  }
}
