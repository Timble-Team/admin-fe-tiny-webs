import { Component, AfterViewInit, OnInit, OnDestroy, NgZone } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { Title } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { CommonService } from 'app/core/services/common.service';
import * as firebase from 'firebase';
import { ApiService } from 'app/core/services/api/api.service';
import { Agency } from 'app/core/model/agency.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'app/core/model/user.model';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

	checked: any;

	// visibleSidebar1 = true;

	// public title = 'lucid';
	// public isStopLoading = false;
	// public showNotifMenu = false;
	// public showToggleMenu = false;
	// public navTab = 'menu';
	public currentActiveMenu = 'light';
	public currentActiveSubMenu;
	visibleSidebar1: any;
	// public themeClass = 'theme-cyan';
	// public smallScreenMenu = '';
	// public darkClass = '';
	// private ngUnsubscribe = new Subject();
	// useRole: string;
	// dataSideBar: any;

	constructor(
		private router: Router,
		private afAuth: AngularFireAuth,
		private ngZone: NgZone,
		private common: CommonService,
	) {}
	// 	private sidebarService: SidebarService,
	// 	private common: CommonService,
	// 	private route: ActivatedRoute,
	// 	private activatedRoute: ActivatedRoute,
	// 	private api: ApiService,
	// 	private themeService: ThemeService,
	// 	private titleService: Title) {
	// 		this.activatedRoute.url.pipe(takeUntil(this.ngUnsubscribe)).subscribe(url => {
	// 			this.isStopLoading = false;
	// 			this.getActiveRoutes();
	// 		});

	// 		this.themeService.themeClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(themeClass => {
	// 			this.themeClass = themeClass;
	// 		});

	// 		this.themeService.smallScreenMenuShow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(showMenuClass => {
	// 			this.smallScreenMenu = showMenuClass;
	// 				});

	// 		this.themeService.darkClassChange.pipe(takeUntil(this.ngUnsubscribe)).subscribe(darkClass => {
	// 				this.darkClass = darkClass;
	// 		});
	// }

	ngOnInit() {
		this.common.collections$.subscribe(collections => {
			console.log(collections);
		});
		this.afAuth.auth.onAuthStateChanged((user) => {
			this.ngZone.run(() => {
				if (user) {
					this.common.setCurrentUser(new User(user.providerData[0]).user);
				}
			});
		});
	}

	// ngOnInit() {
	// 	this.common.user$.subscribe(user => {
	// 		if (user) {
	// 			this.useRole = user.adminType;
	// 			this.setDataSideBar(this.useRole);
	// 		}
	// 	});
	// 	const that = this;
	// 	this.router.events
	// 		.filter((event) => event instanceof NavigationEnd)
	// 		.map(() => this.activatedRoute)
	// 		.map((route) => {
	// 			that.themeService.hideMenu();
	// 			while (route.firstChild) { route = route.firstChild; }
	// 			return route;
	// 		})
	// 		.filter((route) => route.outlet === 'primary')
	// 		.mergeMap((route) => route.data)
  //           .pipe(takeUntil(this.ngUnsubscribe))
  //           .subscribe((event) => this.titleService.setTitle(event['title']));
	// }

	// setDataSideBar(userRole: string) {
	// }

	// ngOnDestroy() {
	// 	this.ngUnsubscribe.next();
	// 	this.ngUnsubscribe.complete();
	// }

	// toggleNotificationDropMenu() {
	// 	this.showNotifMenu = !this.showNotifMenu;
	// }

	// toggleSettingDropMenu() {
	// 	this.showToggleMenu = !this.showToggleMenu;
	// }

	// ngAfterViewInit() {
	// 	const that = this;
	// 	setTimeout(function () {
	// 		that.isStopLoading = true;
	// 	}, 1000);

	// }

	getActiveRoutes() {
		const segments: Array<string> = this.router.url.replace('/admin/', '').split('/');
		this.currentActiveMenu = segments.slice(0, 2).join('/');
		this.currentActiveSubMenu = segments[4];
	}

	// activeInactiveMenu($event) {
	// 	if ($event.item && $event.item === this.currentActiveMenu) {
	// 		this.currentActiveMenu = '';
	// 	} else {
	// 		this.currentActiveMenu = $event.item;
	// 	}
	// }
}
