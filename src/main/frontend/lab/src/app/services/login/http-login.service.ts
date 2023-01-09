import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { BehaviorSubject } from 'rxjs';
import { User } from "src/app/model/user/user";
import { AppConfig } from '../config.service';
import { LoginService } from './login';


@Injectable({
	providedIn: 'root'
})
export class HttpLoginService implements LoginService {

	readonly user = new BehaviorSubject<User | undefined>(undefined);

	constructor(
		private config: AppConfig,
		private http: HttpClient
	) {
		const user = localStorage.getItem('user')
		if (user != null && user != "undefined") {
			this.user.next(JSON.parse(user))
		}
		this.user.subscribe(user => localStorage.setItem('user', JSON.stringify(user)))
	}

	login(user: User, callback: () => void): void {
		const headers = this.createAuthHeader(user)

		this.http.get<boolean>(this.config.serverUrl + this.config.authConfig.baseUrl + this.config.authConfig.login, { headers })
			.subscribe({
				next: (data) => this.user.next(data ? user : undefined),
				complete: callback
			})
	}

	register(user: User, callback: () => void): void {
		this.http.post<void>(this.config.serverUrl + this.config.authConfig.baseUrl + this.config.authConfig.register, user)
			.subscribe({
				next: () => {
					this.user.next(user)
					callback()
				},
				error: () => {
					this.user.next(undefined)
					callback()
				}
			})

	}

	logOut(): void {
		this.user.next(undefined)
	}

	getAuthHeader(): HttpHeaders {
		return this.createAuthHeader(this.user.getValue())
	}

	createAuthHeader(user?: User): HttpHeaders {
		let headers = new HttpHeaders()

		if (user != null) {
			headers = headers.set("Authorization", "Basic " + Buffer.from(user.username + ":" + user.password).toString('base64'))
		}

		return headers
	}

}
