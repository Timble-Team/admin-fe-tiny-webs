import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import { CommonService } from 'app/core/services/common.service';
import { MenuItem } from 'primeng/api';
import { SidebarData } from './sidebar.data';
import data from './user-settings.data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  items: MenuItem[];
  user: any;
  userSettings = data;

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

	// @Input() sidebarVisible = true;
	// @Input() navTab = 'menu';
	// @Input() currentActiveMenu;
	// @Input() currentActiveSubMenu;
	// @Input() sidebarData;
	// @Output() changeNavTabEvent = new EventEmitter();
	// @Output() activeInactiveMenuEvent = new EventEmitter();

	// public themeClass = 'theme-cyan';
	// public darkClass = '';
	// private ngUnsubscribe = new Subject();
	// user: any;

	// constructor(
	// 	private themeService: ThemeService,
	// 	private common: CommonService,
	// 	private authSevice: AuthService) {
	// 		this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
	// 	this.themeClass = themeClass;
	// 		});
	// 		this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
	// 				this.darkClass = darkClass;
	// 		});
	// }

	// ngOnInit() {
	// 	this.common.user$.subscribe(user => this.user = user);
	// }

	// ngOnDestroy() {
	// 	this.ngUnsubscribe.next();
	// 	this.ngUnsubscribe.complete();
	// }

	// changeNavTab(tab: string) {
	// 	this.navTab = tab;
	// }

	// activeInactiveMenu(menuItem: string) {
	// 	this.activeInactiveMenuEvent.emit({ 'item': menuItem });
	// }

	// changeTheme(theme: string) {
	// 	this.themeService.themeChange(theme);
  //   }

	// changeDarkMode(darkClass: string) {
	// 		this.themeService.changeDarkMode(darkClass);
	// }

	// logout() {
	// 	this.authSevice.logout();
	// }
