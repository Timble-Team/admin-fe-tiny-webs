import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxGalleryModule } from 'ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/module/core.module';
import { DialogService, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AppConfigService } from './core/services/api/config.service';
import { FirebaseService } from './core/services/api/firebase.service';
import { AdminResolver } from './admin/admin.resolver';
import { SharedModule } from './shared/components/shared.module';
import { ReactiveFormModule } from '@theflames/reactive-form';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ThemeModule } from 'app/shared/theme.module';
import { AngularFireModule, FirebaseOptionsToken } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

export function appInit(appConfigService: AppConfigService) {
	return appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    NgbModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    DynamicDialogModule,
    ReactiveFormModule.forRoot(),
    ThemeModule.forRoot(),
    RichTextEditorAllModule,
    FullCalendarModule,
    NgxGalleryModule,
    HttpClientModule,
    AngularFireModule,
		AngularFirestoreModule,
		AngularFireStorageModule,
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService,
    FirebaseService,
    AdminResolver,
    {
      provide: FirebaseOptionsToken,
      deps: [AppConfigService],
      useFactory: appInit
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
