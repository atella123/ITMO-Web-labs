import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class AppConfig {

	public readonly serverUrl = ""
	public readonly areaConfig = {
		baseUrl: "api/area",
		checkPoint: "/checkPoint"
	}
	public readonly authConfig = {
		baseUrl: "api/auth/",
		login: "login",
		register: "register"
	}

}
