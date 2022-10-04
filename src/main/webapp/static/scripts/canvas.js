export class Canvas {

	static font = new FontFace('Roboto mono', 'url(https://fonts.gstatic.com/s/robotomono/v22/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2_ROW4.woff2)', {
		weight: '900'
	})

	#canvas
	#ctx
	#pointSize
	#width
	#height
	#restrictions
	#canvasCenter

	constructor(canvas, requestDispatcher, colorCreator) {
		this.#canvas = canvas
		this.#ctx = canvas.getContext("2d")
		this.#pointSize = 5

		this.#width = Math.min(this.#canvas.width, this.#canvas.height)
		this.#height = this.#width

		this.#restrictions = {
			x: {
				min: (canvas.offsetWidth - canvas.width) / 2,
				max: canvas.offsetWidth - (canvas.offsetWidth - canvas.width) / 2,
			},
			y: {
				min: (canvas.offsetHeight - canvas.height) / 2,
				max: canvas.offsetHeight - (canvas.offsetHeight - canvas.height) / 2
			}
		}

		this.#canvasCenter = {
			x: canvas.offsetWidth / 2,
			y: canvas.offsetHeight / 2,
		}

		this.#draw()
		canvas.addEventListener("click", this.#createEventListener(requestDispatcher, colorCreator))
	}

	drawPoint(x, y, r, color) {
		const oldColor = this.#ctx.fillStyle

		this.#ctx.fillStyle = color
		const coords = this.pointCoordsToCanvasCoords(x, y, r);

		this.#ctx.beginPath()
		this.#ctx.arc(coords.x, coords.y, this.#pointSize, 0, Math.PI * 2)
		this.#ctx.fill()

		this.#ctx.fillStyle = oldColor
	}

	redraw() {
		this.#ctx.clearRect(0, 0, this.#width, this.#height)
		this.#draw()
	}

	#draw() {
		const lineWidth = 5
		const width = this.#width
		const height = this.#height


		let grd = this.#ctx.createLinearGradient(0, height, width * 0.8, 0)
		grd.addColorStop(0.7, "rgba(0,149,182,0.3)")
		grd.addColorStop(0, "rgba(94,209,140,0.3)")

		this.#ctx.fillStyle = grd

		// rect
		this.#ctx.fillRect(width * 0.35, height * 0.2, width * 0.15, height * 0.3);
		this.#ctx.strokeRect(width * 0.35, height * 0.2, width * 0.15, height * 0.3);

		// triangle
		this.#ctx.beginPath()
		this.#ctx.moveTo(width * 0.5, height * 0.2)
		this.#ctx.lineTo(width * 0.8, height / 2)
		this.#ctx.lineTo(width / 2, height / 2)
		this.#ctx.fill()
		this.#ctx.beginPath()
		this.#ctx.moveTo(width * 0.5, height * 0.2)
		this.#ctx.lineTo(width * 0.8, height / 2)
		this.#ctx.lineTo(width / 2, height / 2)
		this.#ctx.stroke()

		// arc
		this.#ctx.beginPath()
		this.#ctx.arc(width / 2, height / 2, width / 2 * 0.6, Math.PI * 0.5, Math.PI)
		this.#ctx.lineTo(width / 2, height / 2)
		this.#ctx.fill()
		this.#ctx.beginPath()
		this.#ctx.arc(width / 2, height / 2, width / 2 * 0.6, Math.PI * 0.5, Math.PI)
		this.#ctx.lineTo(width / 2, height / 2)
		this.#ctx.stroke()

		grd = this.#ctx.createLinearGradient(0, height, width * 0.8, 0)
		grd.addColorStop(0.3, "#5ED18C")
		grd.addColorStop(1, "#0095B6")

		const color = grd
		this.#ctx.font = '16px Roboto mono'
		this.#ctx.fillStyle = 'black'

		// x axis
		this.#drawLine(color, width * 0.05, height / 2, width * 0.90, 0, lineWidth)
		// arrow
		this.#drawLine(color, width * 0.95 - 1, height / 2 + 1, -width * 0.05, height * 0.025, lineWidth)
		this.#drawLine(color, width * 0.95 - 1, height / 2 - 1, -width * 0.05, -height * 0.025, lineWidth)

		// R 
		this.#drawLine(color, width * 0.8, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.#ctx.fillText('R', width * 0.8 - 4, height / 2 + height * 0.015 + 17)

		// R / 2
		this.#drawLine(color, width * 0.65, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.#ctx.fillText('R/2', width * 0.65 - 16, height / 2 + height * 0.015 + 17)

		// -R / 2
		this.#drawLine(color, width * 0.35, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.#ctx.fillText('-R/2', width * 0.35 - 24, height / 2 + height * 0.015 + 17)

		// -R 
		this.#drawLine(color, width * 0.2, height / 2 - height * 0.015, 0, height * 0.03, lineWidth)
		this.#ctx.fillText('-R', width * 0.2 - 24, height / 2 + height * 0.015 + 17)


		// y axis
		this.#drawLine(color, width / 2, height * 0.05, 0, height * 0.9, lineWidth)
		// arrow
		this.#drawLine(color, width / 2 + 1, height * 0.05 - 1, width * 0.025, height * 0.05, lineWidth)
		this.#drawLine(color, width / 2 - 1, height * 0.05 - 1, -width * 0.025, height * 0.05, lineWidth)

		// R 
		this.#drawLine(color, width / 2 - width * 0.015, height * 0.2, width * 0.03, 0, lineWidth)
		this.#ctx.fillText('R', width / 2 - width * 0.015 - 14, height * 0.2 + 5 - 8)

		// R / 2
		this.#drawLine(color, width / 2 - width * 0.015, height * 0.35, width * 0.03, 0, lineWidth)
		this.#ctx.fillText('R/2', width / 2 - width * 0.015 - 32, height * 0.35 + 5)

		// -R / 2
		this.#drawLine(color, width / 2 - width * 0.015, height * 0.65, width * 0.03, 0, lineWidth)
		this.#ctx.fillText('-R/2', width / 2 - width * 0.015 - 44, height * 0.65 + 5)

		// -R 
		this.#drawLine(color, width / 2 - width * 0.015, height * 0.8, width * 0.03, 0, lineWidth)
		this.#ctx.fillText('-R', width / 2 - width * 0.015 - 24, height * 0.8 + 5 + 8)
	}

	pointCoordsToCanvasCoords(x, y, r) {
		return {
			x: this.#canvasCenter.x - this.#restrictions.x.min + x / r * (this.#width * 0.3),
			y: this.#canvasCenter.y - this.#restrictions.y.min - y / r * (this.#height * 0.3)
		}
	}

	canvasCoordsToPointCoords(x, y, r) {
		return {
			x: x * r / (this.#width * 0.3),
			y: y * r / (this.#height * 0.3)
		}
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

	#createEventListener(requestDispatcher, colorCreator) {
		const restrictions = this.#restrictions
		const canvasCenter = this.#canvasCenter
		const obj = this

		return (e) => {

			const pointCoords = {
				x: e.layerX - canvasCenter.x,
				y: -(e.layerY - canvasCenter.y)
			}

			if (e.layerX < restrictions.x.min || e.layerX > restrictions.x.max || e.layerY < restrictions.y.min || e.layerY > restrictions.y.max) {
				return
			}

			requestDispatcher({ x: pointCoords.x, y: pointCoords.y, r: 0, color: colorCreator() }, obj);
		}
	}
}