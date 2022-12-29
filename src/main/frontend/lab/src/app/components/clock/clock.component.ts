import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { drawLine } from 'src/app/util/canvas/canvas';

@Component({
	selector: 'app-clock',
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.css']
})
export class ClockComponent implements AfterViewInit {

	@Input('timeFunction')
	getTime: () => Date

	@Input()
	timeout: number

	@Input()
	fontSize: number

	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>

	private ctx: CanvasRenderingContext2D
	private width: number
	private height: number
	private interval: ReturnType<typeof setInterval> | null

	public ngAfterViewInit() {
		this.ctx = this.canvas.nativeElement.getContext('2d')!

		this.width = this.canvas.nativeElement.width
		this.height = this.width

		this.ctx.font = `${this.fontSize}px Roboto mono`
		this.ctx.textAlign = "center"
		this.start()
	}

	public start() {
		this.redraw()
		this.interval = setInterval(() => this.redraw(), this.timeout)
	}

	public stop() {
		if (!this.interval) return

		clearInterval(this.interval)
		this.interval = null
	}

	private redraw() {
		this.ctx.clearRect(0, 0, this.width, this.height)
		this.draw()
	}

	private draw() {
		const width = this.width
		const height = this.height

		let grd = this.ctx.createLinearGradient(width * 0.3, height, width * 0.7, height * 0.65)
		grd.addColorStop(0.7, "rgba(0,149,182,0.3)")
		grd.addColorStop(0, "rgba(94,209,140,0.3)")

		this.ctx.fillStyle = grd

		// circle
		this.ctx.beginPath()
		this.ctx.arc(width / 2, height / 2 * 0.65, width / 2 * 0.6, 0, Math.PI * 2)
		this.ctx.fill()
		this.ctx.beginPath()
		this.ctx.arc(width / 2, height / 2 * 0.65, width / 2 * 0.6, 0, Math.PI * 2)
		this.ctx.stroke()

		const time = this.getTime()

		this.drawHour(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds())
		this.drawMinute(time.getMinutes(), time.getSeconds(), time.getMilliseconds())
		this.drawSecond(time.getSeconds(), time.getMilliseconds())

		grd = this.ctx.createLinearGradient(width * 0.3, height, width * 0.7, height * 0.65)
		grd.addColorStop(0.7, "rgb(0,149,182)")
		grd.addColorStop(0, "rgb(94,209,140)")

		this.ctx.fillStyle = grd

		this.ctx.beginPath()
		this.ctx.arc(width / 2, height / 2 * 0.65, width / 2 * 0.05, 0, Math.PI * 2)
		this.ctx.fill()

		this.ctx.fillText(time.toLocaleDateString('en-us', { weekday: "long" }), width / 2, height * 0.9 - this.fontSize * 0.6)
		this.ctx.fillText(time.toLocaleDateString('en-us', { month: "short", day: "numeric", year: "numeric" }), width / 2, height * 0.9 + this.fontSize * 0.6)
	}

	private drawHour(hour: number, minute: number, second: number, millisecond: number) {
		let grd = this.ctx.createLinearGradient(this.width * 0.3, this.height, this.width * 0.7, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const deg = (hour % 12 + (minute + (second + millisecond / 1000) / 60) / 60) / 12 * Math.PI * 2
		const lineLength = 0.5

		drawLine(this.ctx, grd, this.width / 2, this.height / 2 * 0.65, this.width / 2 * 0.6 * Math.sin(deg) * lineLength, -this.width / 2 * 0.6 * Math.cos(deg) * lineLength, 5)
	}

	private drawMinute(minute: number, second: number, millisecond: number) {
		let grd = this.ctx.createLinearGradient(this.width * 0.3, this.height, this.width * 0.7, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const deg = (minute + (second + millisecond / 1000) / 60) / 60 * Math.PI * 2
		const lineLength = 0.7

		drawLine(this.ctx, grd, this.width / 2, this.height / 2 * 0.65, this.width / 2 * 0.6 * Math.sin(deg) * lineLength, -this.width / 2 * 0.6 * Math.cos(deg) * lineLength, 3)
	}

	private drawSecond(second: number, millisecond: number) {
		let grd = this.ctx.createLinearGradient(this.width * 0.3, this.height, this.width * 0.7, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const deg = (second + millisecond / 1000) / 60 * Math.PI * 2
		const lineLength = 0.8

		drawLine(this.ctx, grd, this.width / 2, this.height / 2 * 0.65, this.width / 2 * 0.6 * Math.sin(deg) * lineLength, -this.width / 2 * 0.6 * Math.cos(deg) * lineLength, 1.5)
	}
}
