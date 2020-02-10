import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { FullCalendarModule } from 'ng-fullcalendar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxGalleryModule } from 'ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/module/core.module';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogService, MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AppConfigService } from './core/services/api/config.service';
import { FirebaseService } from './core/services/api/firebase.service';
import { AdminResolver } from './admin/admin.resolver';

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
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    FullCalendarModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    DynamicDialogModule,
    NgxGalleryModule,
    HttpClientModule
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService,
    FirebaseService,
    AdminResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
