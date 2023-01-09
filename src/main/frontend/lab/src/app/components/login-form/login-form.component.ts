import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, LOGIN_SERVICE } from 'src/app/services/login/login';
import { shake } from 'src/app/util/animations';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.css'],
	animations: [shake]
})
export class LoginFormComponent implements OnInit {

	public loginForm: FormGroup
	public animateInvalid: string

	constructor(
		@Inject(LOGIN_SERVICE) private loginService: LoginService,
		private fb: FormBuilder,
		private router: Router
	) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			login: new FormControl('', [
				Validators.required,
				Validators.minLength(5)
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(5)
			]),
			updateOn: 'blur'
		})
	}

	sendLoginRequest() {
		const user = { username: this.loginForm.get('login')?.value, password: this.loginForm.get('password')?.value }
		this.loginService.login(user,
			() => this.router.navigate(['main']).then((res) => {
				// console.log(res)
				if (!res) {
					this.animateInvalid = 'done'
				}
			})
		)
	}

	sendRegisterRequest() {
		const user = { username: this.loginForm.get('login')?.value, password: this.loginForm.get('password')?.value }
		this.loginService.register(user,
			() => this.router.navigate(['main']).then((res) => {
				// console.log(res)
				if (!res) {
					this.animateInvalid = 'done'
				}
			})
		)
	}

	stopAnimation() {
		this.animateInvalid = ''
	}

	get login() { return this.loginForm.get('login')!; }

	get password() { return this.loginForm.get('password')!; }

}
