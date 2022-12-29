import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of, startWith, Subject, switchMap, take, takeWhile } from 'rxjs';
import { Area } from 'src/app/model/area/area';
import { Point } from 'src/app/model/area/point';
import { AreaResponse } from 'src/app/model/area/response';
import { AreaService } from './area-request.service';

@Injectable({
	providedIn: 'root'
})
export class FakeAreaService implements AreaService {

	private responsesArray: AreaResponse[]
	readonly responses: BehaviorSubject<AreaResponse[]>

	private rVal: number
	readonly r: BehaviorSubject<number>

	constructor() {
		this.responsesArray = []
		this.rVal = 0

		for (let i = 0; i < 5; i++) {
			this.responsesArray.push(this.createRandomResponse())
		}

		this.responses = new BehaviorSubject(this.responsesArray)
		this.r = new BehaviorSubject(this.rVal)
	}

	setR(r: number): void {
		this.r.next(r)
		this.rVal = r
	}

	checkPoint(point: Point): boolean {
		if (this.rVal <= 0) {
			return false
		}

		const resp = this.createRandomResponse()

		this.responsesArray.push({
			point: point,
			r: this.rVal,
			inArea: resp.inArea,
			completionTime: resp.completionTime,
			currentTime: resp.currentTime
		})

		this.responses.next(this.responsesArray)
		return true
	}

	getAllAreas(): Area[] {
		return []
	}

	private createRandomResponse(): AreaResponse {
		const start = new Date(1970, 0, 1)
		const end = new Date()

		return {
			point: { x: Math.random() * 8 - 4, y: Math.random() * 10 - 5 },
			r: Math.round(Math.random() * 4) + 1,
			inArea: Math.random() <= 0.5,
			completionTime: Math.random() * Math.pow(10, 9),
			currentTime: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
		}
	}
}
