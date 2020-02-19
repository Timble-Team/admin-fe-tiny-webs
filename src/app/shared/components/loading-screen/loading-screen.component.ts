import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';


@Component({
  selector: 'loading-screen',
  templateUrl: './loading-screen.component.html'
})

export class LoadingScreenComponent implements OnInit {
  message = 'Please wait!';
  display: boolean;

  constructor(private common: CommonService) {

  }

  ngOnInit() {
    this.common.loadingScreen$.subscribe(data => {
      if (data) {
        this.message = data.message;
        this.display = data.display;
      }
    });
  }

}
