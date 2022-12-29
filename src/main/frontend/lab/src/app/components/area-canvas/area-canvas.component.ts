import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Point } from 'src/app/model/area/point';
import { AreaResponse } from 'src/app/model/area/response';
import { AreaService, AREA_REQUEST_SERVICE } from 'src/app/services/area/area-request.service';

import { drawLine, easeOutBounce } from 'src/app/util/canvas/canvas';


@Component({
	selector: 'app-area-canvas',
	templateUrl: './area-canvas.component.html',
	styleUrls: ['./area-canvas.component.css']
})
export class AreaCanvasComponent implements AfterViewInit {

	@Input()
	fontSize: number

	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>

	private ctx: CanvasRenderingContext2D
	private width: number
	private height: number
	private pointSize: number = 5

	private currentR: number
	private currentResponses: AreaResponse[]

	private restrictions: { x: { min: number, max: number }, y: { min: number, max: number } }
	private canvasCenter: { x: number, y: number }

	constructor(
		@Inject(AREA_REQUEST_SERVICE) private areaService: AreaService
	) { }

	ngAfterViewInit() {
		this.ctx = this.canvas.nativeElement.getContext('2d')!

		this.ctx.font = `${this.fontSize}px Roboto mono`
		this.ctx.textAlign = "center"

		this.width = this.canvas.nativeElement.width
		this.height = this.width

		const canvasElement = this.canvas.nativeElement

		this.restrictions = {
			x: {
				min: (canvasElement.offsetWidth - canvasElement.width) / 2,
				max: canvasElement.offsetWidth - (canvasElement.offsetWidth - canvasElement.width) / 2,
			},
			y: {
				min: (canvasElement.offsetHeight - canvasElement.height) / 2,
				max: canvasElement.offsetHeight - (canvasElement.offsetHeight - canvasElement.height) / 2
			}
		}

		this.canvasCenter = {
			x: canvasElement.offsetWidth / 2,
			y: canvasElement.offsetHeight / 2,
		}

		this.areaService.responses.subscribe((responses) => {
			this.currentResponses = responses
			this.drawAllResponses(this.currentR)
		})

		this.areaService.r.subscribe((r) => {
			if (r > 0) {
				this.animateRadiusChange(r, this.currentR)
				this.currentR = r
			}
		})
	}

	private drawAllResponses(r: number) {
		this.redraw()

		for (let response of this.currentResponses) {
			let color = response.inArea ? "rgb(37, 255, 182)" : "rgb(216, 83, 87)";
			if (r != response.r) color = "rgb(15, 192, 252)"

			this.drawPoint(response.point, r, color)
		}
	}

	private animateRadiusChange(newVal: number, oldVal: number) {
		if (!oldVal) {
			this.drawAllResponses(newVal)
			return
		}

		const frameCount = 100
		let val = oldVal
		let currentFrameCount = 0

		const f = () => {
			if (currentFrameCount++ == frameCount) {
				this.drawAllResponses(newVal)
				return
			}
			val = oldVal + easeOutBounce(currentFrameCount / frameCount) * (newVal - oldVal)
			this.drawAllResponses(val)

			window.requestAnimationFrame(f)
		}

		f()
	}

	private drawPoint(point: Point, r: number, color: string) {
		const oldColor = this.ctx.fillStyle

		this.ctx.fillStyle = color
		const coords = this.pointCoordsToCanvasCoords(point, r);

		this.ctx.beginPath()
		this.ctx.arc(coords.x, coords.y, this.pointSize, 0, Math.PI * 2)
		this.ctx.fill()

		this.ctx.fillStyle = oldColor
	}

	private redraw() {
		this.ctx.clearRect(0, 0, this.width, this.height)
		this.draw()
	}

	private draw() {
		const lineWidth = 5
		const width = this.width
		const height = this.height

		let grd = this.ctx.createLinearGradient(0, height, width * 0.8, 0)
		grd.addColorStop(0.7, "rgba(0,149,182,0.3)")
		grd.addColorStop(0, "rgba(94,209,140,0.3)")

		this.ctx.fillStyle = grd

		// rect
		this.ctx.fillRect(width * 0.2, height * 0.2, width * 0.3, height * 0.3);
		this.ctx.strokeRect(width * 0.2, height * 0.2, width * 0.3, height * 0.3);

		// triangle
		this.ctx.beginPath()
		this.ctx.moveTo(width * 0.5, height * 0.8)
		this.ctx.lineTo(width * 0.2, height / 2)
		this.ctx.lineTo(width / 2, height / 2)
		this.ctx.fill()
		this.ctx.beginPath()
		this.ctx.moveTo(width * 0.5, height * 0.8)
		this.ctx.lineTo(width * 0.2, height / 2)
		this.ctx.lineTo(width / 2, height / 2)
		this.ctx.stroke()

		// arc
		this.ctx.beginPath()
		this.ctx.arc(width / 2, height / 2, width / 2 * 0.6, Math.PI * 1.5, 0)
		this.ctx.lineTo(width / 2, height / 2)
		this.ctx.fill()
		this.ctx.beginPath()
		this.ctx.arc(width / 2, height / 2, width / 2 * 0.6, Math.PI * 1.5, 0)
		this.ctx.lineTo(width / 2, height / 2)
		this.ctx.stroke()

		grd = this.ctx.createLinearGradient(0, height, width * 0.8, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const color = grd
		this.ctx.font = `${this.fontSize}px Roboto mono`
		this.ctx.fillStyle = 'black'

		// x axis
		drawLine(this.ctx, color, width * 0.05, height / 2, width * 0.90, 0, lineWidth)
		// arrow
		drawLine(this.ctx, color, width * 0.95 - 1, height / 2 + 1, -width * 0.05, height * 0.025, lineWidth)
		drawLine(this.ctx, color, width * 0.95 - 1, height / 2 - 1, -width * 0.05, -height * 0.025, lineWidth)

		// R 
		drawLine(this.ctx, color, width * 0.8, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.ctx.fillText('R', width * 0.8 - 4, height / 2 + height * 0.015 + 17)

		// R / 2
		drawLine(this.ctx, color, width * 0.65, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.ctx.fillText('R/2', width * 0.65 - 16, height / 2 + height * 0.015 + 17)

		// -R / 2
		drawLine(this.ctx, color, width * 0.35, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.ctx.fillText('-R/2', width * 0.35 - 24, height / 2 + height * 0.015 + 17)

		// -R 
		drawLine(this.ctx, color, width * 0.2, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.ctx.fillText('-R', width * 0.2 - 24, height / 2 + height * 0.015 + 17)


		// y axis
		drawLine(this.ctx, color, width / 2, height * 0.05, 0, height * 0.9, lineWidth)
		// arrow
		drawLine(this.ctx, color, width / 2 + 1, height * 0.05 - 1, width * 0.025, height * 0.05, lineWidth)
		drawLine(this.ctx, color, width / 2 - 1, height * 0.05 - 1, -width * 0.025, height * 0.05, lineWidth)

		// R 
		drawLine(this.ctx, color, width / 2 - width * 0.015, height * 0.2, width * 0.03, 0, lineWidth)
		this.ctx.fillText('R', width / 2 - width * 0.015 - 14, height * 0.2 + 5 - 8)

		// R / 2
		drawLine(this.ctx, color, width / 2 - width * 0.015, height * 0.35, width * 0.03, 0, lineWidth)
		this.ctx.fillText('R/2', width / 2 - width * 0.015 - 32, height * 0.35 + 5)

		// -R / 2
		drawLine(this.ctx, color, width / 2 - width * 0.015, height * 0.65, width * 0.03, 0, lineWidth)
		this.ctx.fillText('-R/2', width / 2 - width * 0.015 - 44, height * 0.65 + 5)

		// -R 
		drawLine(this.ctx, color, width / 2 - width * 0.015, height * 0.8, width * 0.03, 0, lineWidth)
		this.ctx.fillText('-R', width / 2 - width * 0.015 - 24, height * 0.8 + 5 + 8)
	}

	private pointCoordsToCanvasCoords(point: Point, r: number): { x: number, y: number } {
		return {
			x: this.canvasCenter.x - this.restrictions.x.min + point.x / r * (this.width * 0.3),
			y: this.canvasCenter.y - this.restrictions.y.min - point.y / r * (this.height * 0.3)
		}
	}

	private canvasCoordsToPointCoords(x: number, y: number, r: number): Point {
		return {
			x: x * r / (this.width * 0.3),
			y: y * r / (this.height * 0.3)
		}
	}

	sendReq(event: MouseEvent) {
		const canvasCoords = {
			x: event.offsetX - this.canvasCenter.x,
			y: -(event.offsetY - this.canvasCenter.y)
		}

		if (event.offsetX < this.restrictions.x.min || event.offsetX > this.restrictions.x.max || event.offsetY < this.restrictions.y.min || event.offsetY > this.restrictions.y.max) {
			return
		}

		const point = this.canvasCoordsToPointCoords(canvasCoords.x, canvasCoords.y, this.currentR)

		this.areaService.checkPoint(point)
	}
}
