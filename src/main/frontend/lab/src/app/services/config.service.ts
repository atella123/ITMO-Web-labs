import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class AppConfig {

	public readonly serverUrl = "127.0.0.1"
	public readonly areaConfig = {
		baseUrl: "api/area/",
		points: "/points",
		checkPoint: "/checkPoint",
		areas: "/areas",
	}
	public readonly authConfig = {
		baseUrl: "api/auth/",
		login: "login"
	}

}
