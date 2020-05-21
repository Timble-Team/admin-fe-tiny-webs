import { NgModule, Injectable, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from 'ng-fullcalendar';
import { AdminComponent } from './admin.component';
import { ChartsModule } from '../charts/charts.module';
import { PagesModule } from '../pages/pages.module';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from 'app/shared/components/shared.module';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { AppConfigService } from 'app/core/services/api/config.service';
import { SidebarModule } from 'primeng/sidebar';
import { LoadingScreenModule } from 'app/shared/components/loading-screen/loading-screen.module';
import { InstanceGuard } from 'app/core/services/auth/auth-guard';
import { CanDeactivateGuard } from 'app/core/services/can-deactivate-guard.service';


const routes: Routes = [
  {
		path: '',
		component: AdminComponent,
		children: [
			{ path: '', redirectTo: 'dashboard'},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'agencies',
				loadChildren: () => import('./agencies/agencies.module').then(m => m.AgenciesModule)
			},
			{
				path: 'categories',
				loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
			},
			{
				path: 'users',
				loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
			},
			{
				path: 'scripts',
				loadChildren: () => import('./scripts/scripts.module').then(m => m.ScriptsModule)
			},
			{
				path: ':instance',
				canActivate: [InstanceGuard],
				loadChildren: () => import('./instance/instance.module').then(m => m.InstanceModule)
			},
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		NgxEchartsModule,
		LayoutModule,
		RichTextEditorAllModule,
		NgbModule,
		FullCalendarModule,
		ChartsModule,
		PagesModule,
		LoadingScreenModule,
		SharedModule,
		SidebarModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AdminComponent
	],
	providers: [
		FirebaseService,
		AppConfigService,
		CanDeactivateGuard
	]
})
export class AdminModule { }
