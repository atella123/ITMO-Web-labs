import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { LoginService, LOGIN_SERVICE } from "./login/login";

@Injectable({
    providedIn: 'root'
})
export class IsLoggedIn implements CanActivate {

    private isLoggedIn = false

    constructor(
        @Inject(LOGIN_SERVICE) private loginService: LoginService,
    ) {
        this.loginService.user.subscribe((user) => this.isLoggedIn = user != null)
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.isLoggedIn
    }

}