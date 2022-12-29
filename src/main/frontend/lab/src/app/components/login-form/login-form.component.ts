import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService, LOGIN_SERVICE } from 'src/app/services/login/login';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

	public loginForm: FormGroup

	constructor(
		@Inject(LOGIN_SERVICE) private loginService: LoginService,
		private fb: FormBuilder
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
		this.loginService.login(
			{ login: this.loginForm.get('login')?.value, password: this.loginForm.get('password')?.value }
		)
	}

	get login() { return this.loginForm.get('login')!; }

	get password() { return this.loginForm.get('password')!; }

}
