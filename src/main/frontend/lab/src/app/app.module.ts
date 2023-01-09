import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { SliderModule } from 'primeng/slider';

import { AreaCanvasComponent } from './components/area-canvas/area-canvas.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { ClockComponent } from './components/clock/clock.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';

import { AreaTableComponent } from './components/area-table/area-table.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { AREA_REQUEST_SERVICE } from './services/area/area-request.service';
import { HttpAreaService } from './services/area/http-area-request.service';
import { HttpLoginService } from './services/login/http-login.service';
import { LOGIN_SERVICE } from './services/login/login';
import { PrimePasswordMaxLengthDirective } from './util/directives/prime-password-max-length.directive';
import { LogoutComponent } from './components/logout/logout.component';

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
		NotFoundPageComponent,
  LogoutComponent
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
		MessageModule,
		HttpClientModule,
		CheckboxModule
	],
	providers: [
		{ provide: LOGIN_SERVICE, useClass: HttpLoginService },
		{ provide: AREA_REQUEST_SERVICE, useClass: HttpAreaService }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
