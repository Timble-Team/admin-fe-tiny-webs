import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'app/core/services/common.service';
import { AdminEnum } from 'app/shared/enum/admin.enum';
import { AuthService } from 'app/core/services/auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
	toggle: Boolean = false;
	user: any;

	constructor(
		private authSevice: AuthService,
		private common: CommonService
	) {

	}

	ngOnInit() {
		this.common.user$.subscribe(user => {
      if (user) {
				this.user = user;
				this.user.role = AdminEnum[this.user.adminType];
      }
    });
	}

	signout() {
		this.authSevice.logout();
	}
}
