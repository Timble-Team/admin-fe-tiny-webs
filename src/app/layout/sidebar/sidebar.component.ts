import { Component, OnInit } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { MenuItem } from 'primeng/api';
import { SidebarData } from './sidebar.data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  items: MenuItem[];
  user: any;

  constructor(
    private common: CommonService
  ) {
	}

  ngOnInit() {
    this.common.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.items = new SidebarData().renderSidebar(this.user.adminType);
      }
    });
  }
}
