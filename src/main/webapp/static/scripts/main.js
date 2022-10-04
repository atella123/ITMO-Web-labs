import { sendData as sendData, animateInvalid } from "./utils.js"
import { Canvas } from "./canvas.js"

const minY = -3
const maxY = 5
const form = document.getElementById("xyrForm")
const xInput = document.getElementById("x-input")
const yInput = document.getElementById("y-input")
const rInput = document.getElementById("r-input")
const yErrorMessage = document.getElementById("y-error-message")
const table = document.getElementById("result-table")
const animationDuration = 700
const canvas = new Canvas(document.getElementById("graph"), sendFormFromGraph, colorCreator)
let tableBody = document.getElementById("result-table-body")

Canvas.font.load().then((font) => {
	document.fonts.add(font)

	redraw()
})

drawPoints(canvas)

function colorCreator() {
	const randomColorVal = () => { return Math.round(Math.random() * 255) }
	return `hsl(${randomColorVal()},100%,40%)`
}

function redraw() {
	canvas.redraw()
	drawPoints(canvas)
}

for (let rSelector of document.getElementsByClassName("r-selector")) {
	rSelector.addEventListener("click", () => {
		const selected = document.querySelector(".r-selector.selected")
		if (selected) { selected.classList.remove("selected") }

		let rMessage = document.getElementById("r-invalid")
		if (rMessage) {
			rMessage.remove()
		}

		const frameCount = 60
		let val = Number(rInput.value)
		const selectedVal = selected ? Number(selected.value) : 0
		const newVal = rSelector != selected ? Number(rSelector.value) : 0
		let currentFrameCount = 0

		const f = () => {
			if (currentFrameCount++ > frameCount) {
				return
			}

			val = selectedVal + easeOutBounce(currentFrameCount / frameCount) * (newVal - selectedVal)
			rInput.value = val
			redraw()

			window.requestAnimationFrame(f)
		}

		if (selected == rSelector) {
			rInput.value = ""
			f()
			return
		}

		rSelector.classList.add("selected")
		rInput.value = rSelector.value
		f()
	})
}

function easeOutBounce(x) {
	const n1 = 7.5625;
	const d1 = 2.75;

	if (x < 1 / d1) {
		return n1 * x * x;
	}
	if (x < 2 / d1) {
		return n1 * (x -= 1.5 / d1) * x + 0.75;
	}
	if (x < 2.5 / d1) {
		return n1 * (x -= 2.25 / d1) * x + 0.9375;
	}
	return n1 * (x -= 2.625 / d1) * x + 0.984375;
}

yInput.addEventListener("change", (event) => {
	if (yInput.value.length === 0) {
		yErrorMessage.innerHTML = "y value must be present"
		animateInvalid(form, animationDuration)
		return
	}

	if (yInput.value.length > 10) {
		yErrorMessage.innerHTML = "10 symbols max"
		animateInvalid(form, animationDuration)
		return
	}

	const yNumValue = Number(yInput.value)

	if (isNaN(yNumValue)) {
		yErrorMessage.innerHTML = "y value must be a number"
		animateInvalid(form, animationDuration)
		return
	}

	if (yNumValue <= minY || yNumValue >= maxY) {
		yErrorMessage.innerHTML = "y value must be between -3 and 5"
		animateInvalid(form, animationDuration)
		return
	}

	yErrorMessage.innerHTML = ""
});

function drawPoints(canvas) {
	for (let point of tableBody.children) {
		const x = Number(point.querySelector(".response-x").innerHTML.trim())
		const y = Number(point.querySelector(".response-y").innerHTML.trim())
		const color = point.querySelector(".response-color").innerHTML.trim()

		canvas.drawPoint(x, y, Number(rInput.value), color)
	}
}

function sendFormFromGraph(data, canvas) {
	if (rInput.value.length === 0) {
		return
	}

	data.r = Number(rInput.value)

	const pointCoords = canvas.canvasCoordsToPointCoords(data.x, data.y, data.r)

	data.x = pointCoords.x
	data.y = pointCoords.y

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
			cell.innerHTML = response.completionTime
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

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const rValidy = rInput.value.length !== 0
	const yValidy = yErrorMessage.innerHTML.length === 0 && yInput.value.length > 0 && yInput.value.length <= 10

	if (!rValidy || !yValidy) {
		animateInvalid(form, animationDuration)
		if (!rValidy && !rInput.classList.contains("invalid")) {
			rInput.insertAdjacentHTML("afterend", '<sub class="invalid-message" id="r-invalid">value must be presented</sub>')
			rInput.classList.add("invalid")
		}
		return
	}

	const data = { x: Number(xInput.value), y: Number(yInput.value), r: Number(yInput.value), color: colorCreator() }

	sendForm(data, canvas)
});

form.addEventListener("reset", () => {
	rInput.value = ""

	let rMessage = document.getElementById("r-invalid")
	if (rMessage) {
		rMessage.remove()
	}

	const selected = document.querySelector(".r-selector.selected")
	if (selected) { selected.classList.remove("selected") }

	yErrorMessage.innerHTML = ""
	rInput.classList.remove("invalid")
});
