import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { ClockComponent } from './components/clock/clock.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { AreaCanvasComponent } from './components/area-canvas/area-canvas.component';

import { AREA_REQUEST_SERVICE } from './services/area/area-request.service';
import { HttpAreaService } from './services/area/http-area-request.service';
import { FakeAreaService } from './services/area/fake-area-request.service';
import { FakeLoginService } from './services/login/fake-login.service';
import { HttpLoginService } from './services/login/http-login.service';
import { LOGIN_SERVICE } from './services/login/login';
import { PrimePasswordMaxLengthDirective } from './util/directives/prime-password-max-length.directive';
import { AreaTableComponent } from './components/area-table/area-table.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';

@NgModule({
	declarations: [
		AppComponent,
		ClockComponent,
		StartPageComponent,
		MainPageComponent,
		HeaderComponent,
		LoginFormComponent,
		PrimePasswordMaxLengthDirective,
		AreaFormComponent,
		AreaCanvasComponent,
		AreaTableComponent,
		NotFoundPageComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		SliderModule,
		ButtonModule,
		InputTextModule,
		PasswordModule,
		MultiSelectModule,
		MessagesModule,
		MessageModule
	],
	providers: [
		{ provide: LOGIN_SERVICE, useClass: FakeLoginService },
		{ provide: AREA_REQUEST_SERVICE, useClass: FakeAreaService }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
