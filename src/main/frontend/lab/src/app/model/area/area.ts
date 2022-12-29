import { Point } from "./point";

export interface Area {

}

export class SquareArea implements Area {
	readonly const: [Point, Point, Point, Point]
}

export class TriangleArea implements Area {
	readonly const: [Point, Point, Point]
}

export class CircleArea implements Area {
	readonly center: Point
	readonly radius: number
}