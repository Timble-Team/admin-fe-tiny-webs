import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';


@NgModule({
	imports: [
		CommonModule,
		NgbModule,
		BreadcrumbModule,
		RouterModule,
	],
	declarations: [HeaderComponent, SidebarComponent, BreadcrumbComponent],
	exports: [HeaderComponent, SidebarComponent, BreadcrumbComponent]
})
export class LayoutModule { }
