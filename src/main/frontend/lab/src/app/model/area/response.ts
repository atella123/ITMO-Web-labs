import { Point } from "./point";

export class AreaResponse {
	readonly point: Point
	readonly r: number
	readonly inArea: boolean
	readonly currentTime: Date
	readonly completionTime: number
}
