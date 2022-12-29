import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Area } from 'src/app/model/area/area';
import { Point } from 'src/app/model/area/point';
import { AreaResponse } from 'src/app/model/area/response';
import { AppConfig } from '../config.service';
import { LoginService, LOGIN_SERVICE } from '../login/login';
import { AreaService } from './area-request.service';

@Injectable({
	providedIn: 'root'
})
export class HttpAreaService implements AreaService {

	private rVal: number;

	constructor(
		private config: AppConfig,
		@Inject(LOGIN_SERVICE) private loginService: LoginService
	) {
		this.rVal = 0
	}

	readonly responses = new Observable<AreaResponse[]>()

	readonly r = new BehaviorSubject<number>(0)

	setR(r: number): void {
		this.r.next(r)
		this.rVal = r
	}

	checkPoint(point: Point): boolean {
		return true
	}

	getAllAreas(): Area[] {
		return []
	}

}