import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, LOGIN_SERVICE } from 'src/app/services/login/login';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

    constructor(
        @Inject(LOGIN_SERVICE) private loginService: LoginService,
        private router: Router
    ) { }

    public logout() {
        this.loginService.logOut()
        this.router.navigate(['/'])
    }

}
