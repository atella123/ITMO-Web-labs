class Clock {

	static font = new FontFace('Roboto mono', 'url(https://fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2_ROW4.woff2)', {
		weight: '900'
	})

	#canvas
	#ctx
	#width
	#height
	#timeout
	#fontSize

	constructor(canvasElement, fontSize, timeout) {
		this.#canvas = canvasElement
		this.#timeout = timeout
		this.#ctx = canvasElement.getContext("2d")
		this.#fontSize = fontSize

		this.#width = Math.min(this.#canvas.width, this.#canvas.height)
		this.#height = this.#width

		this.#ctx.font = `${fontSize}px Roboto mono`
		this.#ctx.textAlign = "center"
		this.#draw()
	}

	redraw() {
		this.#ctx.clearRect(0, 0, this.#width, this.#height)
		this.#draw()
	}

	start() {
		const clock = this
		const redrawClock = () => {
			clock.redraw()
			setTimeout(() => { window.requestAnimationFrame(redrawClock) }, this.#timeout);
		}

		redrawClock()
	}

	#draw() {
		const width = this.#width
		const height = this.#height

		let grd = this.#ctx.createLinearGradient(width * 0.3, height, width * 0.7, height * 0.65)
		grd.addColorStop(0.7, "rgba(0,149,182,0.3)")
		grd.addColorStop(0, "rgba(94,209,140,0.3)")

		this.#ctx.fillStyle = grd

		// circle
		this.#ctx.beginPath()
		this.#ctx.arc(width / 2, height / 2 * 0.65, width / 2 * 0.6, 0, Math.PI * 2)
		this.#ctx.fill()
		this.#ctx.beginPath()
		this.#ctx.arc(width / 2, height / 2 * 0.65, width / 2 * 0.6, 0, Math.PI * 2)
		this.#ctx.stroke()


		const time = new Date()
		this.#drawHour(time.getHours(), time.getMinutes(), time.getSeconds(), time.getMilliseconds())
		this.#drawMinute(time.getMinutes(), time.getSeconds(), time.getMilliseconds())
		this.#drawSecond(time.getSeconds(), time.getMilliseconds())

		grd = this.#ctx.createLinearGradient(width * 0.3, height, width * 0.7, height * 0.65)
		grd.addColorStop(0.7, "rgb(0,149,182)")
		grd.addColorStop(0, "rgb(94,209,140)")

		this.#ctx.fillStyle = grd

		this.#ctx.beginPath()
		this.#ctx.arc(width / 2, height / 2 * 0.65, width / 2 * 0.05, 0, Math.PI * 2)
		this.#ctx.fill()

		this.#ctx.fillText(time.toLocaleDateString('en-us', { weekday: "long" }), width / 2, height * 0.9 - this.#fontSize * 0.6)
		this.#ctx.fillText(time.toLocaleDateString('en-us', { month: "short", day: "numeric", year: "numeric" }), width / 2, height * 0.9 + this.#fontSize * 0.6)
	}

	#drawHour(hour, minute, second, millisecond) {
		let grd = this.#ctx.createLinearGradient(this.#width * 0.3, this.#height, this.#width * 0.7, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const deg = (hour % 12 + (minute + (second + millisecond / 1000) / 60) / 60) / 12 * Math.PI * 2
		const lineLength = 0.5

		this.#drawLine(grd, this.#width / 2, this.#height / 2 * 0.65, this.#width / 2 * 0.6 * Math.sin(deg) * lineLength, -this.#width / 2 * 0.6 * Math.cos(deg) * lineLength, 5)

	}

	#drawMinute(minute, second, millisecond) {
		let grd = this.#ctx.createLinearGradient(this.#width * 0.3, this.#height, this.#width * 0.7, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const deg = (minute + (second + millisecond / 1000) / 60) / 60 * Math.PI * 2
		const lineLength = 0.7

		this.#drawLine(grd, this.#width / 2, this.#height / 2 * 0.65, this.#width / 2 * 0.6 * Math.sin(deg) * lineLength, -this.#width / 2 * 0.6 * Math.cos(deg) * lineLength, 3)
	}

	#drawSecond(second, millisecond) {
		let grd = this.#ctx.createLinearGradient(this.#width * 0.3, this.#height, this.#width * 0.7, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const deg = (second + millisecond / 1000) / 60 * Math.PI * 2
		const lineLength = 0.8

		this.#drawLine(grd, this.#width / 2, this.#height / 2 * 0.65, this.#width / 2 * 0.6 * Math.sin(deg) * lineLength, -this.#width / 2 * 0.6 * Math.cos(deg) * lineLength, 1.5)
	}

	#drawLine(color, x, y, width, height, lineWidth) {

		const oldColor = this.#ctx.fillStyle

		const angle = Math.atan(width / height)

		const xshift = lineWidth / 2 * Math.cos(angle)
		const yshift = lineWidth / 2 * Math.sin(angle)

		this.#ctx.fillStyle = color

		this.#ctx.beginPath()
		this.#ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI)
		this.#ctx.fill()

		this.#ctx.beginPath()
		this.#ctx.arc(x + width, y + height, lineWidth / 2, 0, 2 * Math.PI)
		this.#ctx.fill()

		this.#ctx.beginPath()
		this.#ctx.moveTo(x - xshift, y + yshift)
		this.#ctx.lineTo(x + xshift, y - yshift)
		this.#ctx.lineTo(x + xshift + width, y - yshift + height)
		this.#ctx.lineTo(x - xshift + width, y + yshift + height)
		this.#ctx.fill()

		this.#ctx.fillStyle = oldColor
	}

}