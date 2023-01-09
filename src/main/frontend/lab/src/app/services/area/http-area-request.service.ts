import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Point } from 'src/app/model/area/point';
import { AreaResponse } from 'src/app/model/area/response';
import { AppConfig } from '../config.service';
import { LoginService, LOGIN_SERVICE } from '../login/login';
import { AreaService } from './area-request.service';

@Injectable({
	providedIn: 'root'
})
export class HttpAreaService implements AreaService {

	constructor(
		private http: HttpClient,
		private config: AppConfig,
		@Inject(LOGIN_SERVICE) private loginService: LoginService
	) {
		this.getAreas()
	}

	readonly responses = new BehaviorSubject<AreaResponse[]>([])

	readonly r = new BehaviorSubject<number>(0)

	setR(r: number): void {
		this.r.next(r)
	}

	checkPoint(point: Point): boolean {
		if (this.r.getValue() <= 0) {
			return false
		}

		const headers = this.loginService.getAuthHeader();

		const requestBody = { ...point, r: this.r.getValue() }

		this.http.post(this.config.serverUrl + this.config.areaConfig.baseUrl + this.config.areaConfig.checkPoint, requestBody, { headers })
			.subscribe(() => this.getAreas())

		return true
	}

	private async getAreas() {
		const headers = this.loginService.getAuthHeader();

		this.http.get<AreaResponse[]>(this.config.serverUrl + this.config.areaConfig.baseUrl, { headers })
			.subscribe((resp) => this.responses.next(resp))
	}
}
