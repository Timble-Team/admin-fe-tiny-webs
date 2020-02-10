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
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { ApiService } from 'app/core/services/api/api.service';
import { AppConfigService } from 'app/core/services/api/config.service';

const routes: Routes = [
  {
		path: '',
		component: AdminComponent,
		children: [
			{ path: '', redirectTo: 'dashboard'},
			{
				path: 'agencies',
				loadChildren: () => import('./agencies/agencies.module').then(m => m.AgenciesModule)
			},
			{
				path: 'articles',
				loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule)
			}
		]
	}
];

export function appInit(appConfigService: AppConfigService) {
	return appConfigService.load();
}

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
		SharedModule,
		AngularFireModule,
		AngularFirestoreModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AdminComponent
	],
	providers: [
		FirebaseService,
		AppConfigService,
		{
      provide: FirebaseOptionsToken,
      deps: [AppConfigService],
      useFactory: appInit
    }
	]
})
export class AdminModule { }
