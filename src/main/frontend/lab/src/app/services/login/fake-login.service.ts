import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from "src/app/model/user/user";

@Injectable({
	providedIn: 'root'
})
export class FakeLoginService {

	readonly user = new Subject();

	constructor(
		private router: Router
	) { }

	login(user: User) {
		console.log(user)
		this.router.navigate(['main'])
	}

	register(user: User): void {
		console.log(user)
		this.router.navigate(['main'])
	}

	logOut(): void {
		return
	}

}
