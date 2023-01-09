import { Component, Inject } from '@angular/core';
import { LoginService, LOGIN_SERVICE } from 'src/app/services/login/login';

@Component({
	selector: 'app-start-page',
	templateUrl: './start-page.component.html',
	styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

	constructor(
		@Inject(LOGIN_SERVICE) public loginService: LoginService
	) { }

	getDate = () => new Date()

}
