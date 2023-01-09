import { HttpHeaders } from "@angular/common/http";
import { InjectionToken } from "@angular/core"
import { Observable } from "rxjs";
import { User } from "src/app/model/user/user";

export const LOGIN_SERVICE = new InjectionToken<LoginService>('app.login-service');

export interface LoginService {

	readonly user: Observable<User | undefined>;

	login(user: User, callback: () => void): void

	register(user: User, callback: () => void): void

	logOut(): void

	getAuthHeader(): HttpHeaders

}