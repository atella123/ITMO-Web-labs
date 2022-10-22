import { sendData, animateInvalid, createColor, easeOutBounce, createTextInputValidator } from "./utils.js"
import { Canvas } from "./canvas.js"
import { Input } from "./input.js"

const xConstraints = { min: -3, max: 5 }
const yConstraints = { min: -5, max: 3 }
const form = document.getElementById("xyrForm")
const xInputEl = document.getElementById("x-input")
const yInputEl = document.getElementById("y-input")
const rInputEl = document.getElementById("r-input")
const xErrorMessage = document.getElementById("x-error-message")
const yErrorMessage = document.getElementById("y-error-message")
const table = document.getElementById("result-table")
const animationDuration = 700
const canvas = new Canvas(document.getElementById("graph"), 16, (data, canvas) => { sendFormFromGraph(data, canvas, createColor()) })
let tableBody = document.getElementById("result-table-body")

Canvas.font.load().then((font) => {
	document.fonts.add(font)

	redraw(canvas, Number(rInputEl.value))
})

// const xPredicate = (val) => val.length > 0 && Number(val) > xConstraints.min && Number(val) < xConstraints.max
// const yPredicate = (val) => val.length > 0 && Number(val) > yConstraints.min && Number(val) < yConstraints.max
// const rPredicate = () => true
// const xInput = new Input(xInputEl, xPredicate, createTextInputValidator(xPredicate, xErrorMessage, "x value must be a number between -3 and 5"))
// const yInput = new Input(yInputEl, yPredicate, createTextInputValidator(yPredicate, yErrorMessage, "x value must be a number between -5 and 3"))
// const rInput = new Input(rInputEl, rPredicate, (n, o) => animateRadiusChange(Number(n), Number(o)))

drawPoints(canvas, Number(rInputEl.value))

function redraw(canvas, radius) {
	canvas.redraw()
	drawPoints(canvas, radius)
}

function animateRadiusChange(newVal, oldVal) {
	const frameCount = 100
	let val = oldVal
	let currentFrameCount = 0

	const f = () => {
		if (currentFrameCount++ == frameCount) {
			redraw(canvas, newVal)
			return
		}

		console.log(val)

		val = oldVal + easeOutBounce(currentFrameCount / frameCount) * (newVal - oldVal)
		redraw(canvas, val)

		window.requestAnimationFrame(f)
	}

	f()
}

function drawPoints(canvas, rval) {
	for (let point of tableBody.children) {
		const x = Number(point.querySelector(".response-x").innerHTML.trim())
		const y = Number(point.querySelector(".response-y").innerHTML.trim())
		const color = point.querySelector(".response-color").innerHTML.trim()

		canvas.drawPoint(x, y, rval, color)
	}
}

function sendFormFromGraph(data, canvas, color) {
	if (rInputEl.value.length === 0) {
		return
	}

	data.r = Number(rInputEl.value)

	const pointCoords = canvas.canvasCoordsToPointCoords(data.x, data.y, data.r)

	data.x = pointCoords.x
	data.y = pointCoords.y
	data.color = color

	sendForm(data, canvas)
}

function sendForm(data, canvas) {
	sendData(data).then((responseText) => {
		const responseObject = JSON.parse(responseText)
		const newTableBody = document.createElement("tbody")
		newTableBody.id = tableBody.id

		for (const response of responseObject) {
			const row = newTableBody.insertRow()

			let cell = row.insertCell()
			cell.innerHTML = +response.x.toFixed(3)
			cell.classList.add("response-x")

			cell = row.insertCell()
			cell.innerHTML = +response.y.toFixed(3)
			cell.classList.add("response-y")

			cell = row.insertCell()
			cell.innerHTML = +response.r.toFixed(3)
			cell.classList.add("response-r")

			cell = row.insertCell()
			cell.innerHTML = response.hit ? "Yes!" : "No"
			cell.classList.add(response.hit ? "hit" : "miss")
			cell.classList.add("response-result")

			cell = row.insertCell()
			cell.innerHTML = response.completionTime + " ns"
			cell.classList.add("response-compltionTime")

			cell = row.insertCell()
			cell.innerHTML = response.color
			cell.hidden = true
			cell.classList.add("response-color")

			cell = row.insertCell()
			cell.innerHTML = new Date(response.currentTime).toUTCString()
			cell.classList.add("response-curremtTime")

			canvas.drawPoint(response.x, response.y, data.r, response.color)
		}
		tableBody.parentNode.replaceChild(newTableBody, tableBody);
		tableBody = newTableBody

		table.hidden = false
	})
}

// form.addEventListener("submit", (event) => {
// 	event.preventDefault();

// 	if (!xInput.hasVaildValue() || !yInput.hasVaildValue() || !rInput.hasVaildValue()) {
// 		animateInvalid(form, animationDuration)
// 		return
// 	}

// 	const data = { x: Number(xInputEl.value), y: Number(yInputEl.value), r: Number(yInputEl.value), color: createColor() }

// 	sendForm(data, canvas)
// })

form.addEventListener("reset", () => {
	xErrorMessage.innerHTML = ""
	yErrorMessage.innerHTML = ""
})
