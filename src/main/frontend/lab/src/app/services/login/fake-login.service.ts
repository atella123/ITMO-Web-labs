import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from "src/app/model/user/user";

@Injectable({
	providedIn: 'root'
})
export class FakeLoginService {

	constructor(
		private router: Router
	) { }

	login(user: User) {
		console.log(user)
		this.router.navigate(['main'])
	}

	checkLoginAvailability(login: string): boolean {
		return login == 'login'
	}

	register(user: User): void {
		console.log(user)
		this.router.navigate(['main'])
	}

	logOut(): void {

	}

	getCurrentUserData() {
		return { login: 'login', password: 'password' }
	}

}
