import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/core/services/api/api.service';
import { Agency } from 'app/core/model/agency.model';

@Component({
  selector: 'app-agencies-detail',
  templateUrl: './agencies-detail.component.html',
})
export class AgenciesDetailComponent implements OnInit {
  agency: Agency;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private common: CommonService
  ) { }

  ngOnInit() {
    this.common.user$.subscribe(user => {
      const id = this.route.snapshot.params.id;
      if (user.adminType === 1 &&  id === 'me') {
        if (user.agencies.length === 1) {
          this.api.get(['agencys', user.agencies[0]]).subscribe((res: Agency) => {
            this.agency = res;
          });
        }
      } else if (user.adminType === 0 && id !== 'me') {
        this.api.get(['agencys', id]).subscribe((res: Agency) => {
          this.agency = res;
        });
      }
    });
  }
}
