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
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { FirebaseService } from 'app/core/services/api/firebase.service';
import { ApiService } from 'app/core/services/api/api.service';
import { AppConfigService } from 'app/core/services/api/config.service';
import { SidebarModule } from 'primeng/sidebar';
import { LoadingScreenModule } from 'app/shared/components/loading-screen/loading-screen.module';


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
			},
			{
				path: 'albums',
				loadChildren: () => import('./albums/albums.module').then(m => m.AlbumsModule)
			},
			{
				path: 'categories',
				loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
			},
			{
				path: 'videos',
				loadChildren: () => import('./videos/videos.module').then(m => m.VideosModule)
			},
			{
				path: 'scripts',
				loadChildren: () => import('./scripts/scripts.module').then(m => m.ScriptsModule)
			}
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
		AppConfigService
	]
})
export class AdminModule { }
