import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from '../../core/services/common.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../../app/services/sidebar.service';
import { MenuItem } from 'primeng/api';
import { isNullOrUndefined } from 'util';
import { filter } from 'rxjs/operators';

class Crumb {
  title: string;
  level: number;
  link: string;

  constructor(data) {
    this.title = data.title;
    this.level = data.level;
    this.link = location.pathname;
  }
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  readonly home = {icon: 'pi pi-home', url: '/'};

  menuItems: any;

  constructor(
    private common: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private sidebarService: SidebarService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.menuItems = this.createBreadcrumbs(this.route.root);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.menuItems = this.createBreadcrumbs(this.route.root));
  }

  private createBreadcrumbs(route: ActivatedRoute, routerLink: string = '', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        routerLink += `/${routeURL}`;
      }

      const label = child.snapshot.data[BreadcrumbComponent.ROUTE_DATA_BREADCRUMB];
      if (!isNullOrUndefined(label) && child.component) {
        breadcrumbs.push({label, routerLink});
      }

      return this.createBreadcrumbs(child, routerLink, breadcrumbs);
    }
  }

}
