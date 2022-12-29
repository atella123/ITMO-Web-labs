import { InjectionToken } from "@angular/core"
import { Observable } from "rxjs";
import { Area } from "src/app/model/area/area";
import { Point } from "src/app/model/area/point";
import { AreaResponse } from "src/app/model/area/response";

export const AREA_REQUEST_SERVICE = new InjectionToken<AreaService>('app.area-request-service');

export interface AreaService {

	readonly responses: Observable<AreaResponse[]>

	readonly r: Observable<number>

	setR(r: number): void

	checkPoint(point: Point): boolean

	getAllAreas(): Area[]

}
