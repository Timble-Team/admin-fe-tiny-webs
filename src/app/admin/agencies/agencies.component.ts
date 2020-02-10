import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'app/core/services/api/api.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
})
export class AgenciesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
