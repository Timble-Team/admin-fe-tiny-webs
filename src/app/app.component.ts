import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit() {
    const loadingSplash = document.getElementById('splashLoading');
    loadingSplash.style.display = 'none';
  }

}
