import { Injectable } from '@angular/core';
import { AppConfig } from '../config.service';
import { LoginService } from './login';
import { User } from "src/app/model/user/user";


@Injectable({
	providedIn: 'root'
})
export class HttpLoginService implements LoginService {

	constructor(private config: AppConfig) { }

	login(user: User): void {
	}

	checkLoginAvailability(login: string): boolean {
		return true
	}

	register(user: User): void {

	}

	logOut(): void {

	}

	getCurrentUserData(): User {
		return { login: 'login', password: 'password' }
	}

}
