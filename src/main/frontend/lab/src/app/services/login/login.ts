import { InjectionToken } from "@angular/core"
import { User } from "src/app/model/user/user";

export const LOGIN_SERVICE = new InjectionToken<LoginService>('app.login-service');

export interface LoginService {

	login(user: User): void

	checkLoginAvailability(login: string): boolean

	register(user: User): void

	logOut(): void

	getCurrentUserData(): User

}