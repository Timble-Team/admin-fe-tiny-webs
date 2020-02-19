import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';
import { routing } from './authentication.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormModule } from '@theflames/reactive-form';
import { SharedModule } from 'app/shared/components/shared.module';

@NgModule({
	declarations: [
		LoginComponent,
		AuthenticationComponent
	],
	imports: [
		CommonModule,
		ReactiveFormModule,
		routing,
		RouterModule,
		SharedModule,
	]
})
export class AuthenticationModule { }
