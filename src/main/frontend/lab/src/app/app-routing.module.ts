import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';

const routes: Routes = [
	{ path: '', component: StartPageComponent },
	{ path: 'main', component: MainPageComponent },
	{ path: '404', component: NotFoundPageComponent },
	{ path: '**', redirectTo: "/404" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
