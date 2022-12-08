const yConstraints = { min: -3, max: 3 }
const form = document.getElementById("xyrForm")
const xInputEl = document.getElementById("xyrForm:x-input")
const xButtons = document.querySelectorAll("#x-buttons a")
const yInputEl = document.getElementById("xyrForm:y-input")
const rInputEl = document.getElementById("xyrForm:r-input")
const submitButton = document.getElementById("xyrForm:submit-button")
const xErrorMessage = document.getElementById("x-error-message")
const yErrorMessage = document.getElementById("y-error-message")
const table = document.getElementById("result-table")
const animationDuration = 700
const canvas = new Canvas(document.getElementById("graph"), 16, (data, canvas) => { sendFormFromGraph(data, canvas) })
let tableBody = document.getElementById("result-table_data")

Canvas.font.load().then((font) => {
	document.fonts.add(font)

	redraw(canvas, Number(rInputEl.value))
})

const yPredicate = (val) => val.length > 0 && Number(val) > yConstraints.min && Number(val) < yConstraints.max
const rPredicate = () => true
const xInput = new InputButtons(xInputEl, Array.from(xButtons))
const yInput = new Input(yInputEl, yPredicate, createTextInputValidator(yPredicate, yErrorMessage, "x value must be a number between -5 and 3"))
const rInput = new Input(rInputEl, rPredicate, (n, o) => animateRadiusChange(Number(n), Number(o)))

for (let button of xButtons) {
	button.removeAttribute('onclick')
	button.addEventListener('click', () => {
		xInput.setValue(button.innerText)
		enableSubmitIfFormIsValid()
	})
}

const config = {
	attributes: true,
}

const callback = function (mutationsList) {
	for (let mutation of mutationsList) {
		if (mutation.attributeName === "disabled" && !mutation.target.hasAttribute("disabled")) {
			enableSubmitIfFormIsValid()
		}
	}
}

const observer = new MutationObserver(callback);

observer.observe(submitButton, config);

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

		val = oldVal + easeOutBounce(currentFrameCount / frameCount) * (newVal - oldVal)
		redraw(canvas, val)

		window.requestAnimationFrame(f)
	}

	f()
}

function drawPoints(canvas, rval) {
	for (let point of tableBody.children) {
		const xElem = point.querySelector(".response-x")
		const yElem = point.querySelector(".response-y")
		const rElem = point.querySelector(".response-r")
		const resultElem = point.querySelector(".response-result")

		if (xElem && yElem && resultElem) {

			const x = Number(xElem.innerHTML.trim())
			const y = Number(yElem.innerHTML.trim())
			const r = Number(rElem.innerHTML.trim())

			let color = resultElem.innerHTML == "Yes!" ? "rgb(37, 255, 182)" : "rgb(216, 83, 87)";

			if (r != rval) color = "rgb(15, 192, 252)"

			console.log(color, r)

			canvas.drawPoint(x, y, rval, color)

			resultElem.classList.add(resultElem.innerHTML == "Yes!" ? "hit" : "miss")
		}
	}
}

function sendFormFromGraph(data, canvas) {
	if (rInputEl.value.length === 0) {
		return
	}

	data.r = Number(rInputEl.value)

	const pointCoords = canvas.canvasCoordsToPointCoords(data.x, data.y, data.r)

	const oldXval = xInputEl.value
	const oldYval = yInputEl.value

	xInputEl.value = pointCoords.x
	yInputEl.value = pointCoords.y

	enableSubmit()
	submitButton.click()

	xInputEl.value = oldXval
	yInputEl.value = oldYval

}

function formIsValid() {
	return xInput.hasVaildValue() && yInput.hasVaildValue() && rInput.hasVaildValue()
}

function isSubmitEnabled() {
	return !submitButton.hasAttribute("disabled")
}

function enableSubmit() {
	submitButton.removeAttribute("disabled")
}

function disableSubmit() {
	submitButton.setAttribute("disabled", "")
}

function enableSubmitIfFormIsValid() {
	if (formIsValid()) {
		enableSubmit()
		return false
	}

	disableSubmit()
	return true
}

form.addEventListener("change", () => {
	if (!enableSubmitIfFormIsValid()) animateInvalid(form, animationDuration)
})
yInputEl.addEventListener("input", enableSubmitIfFormIsValid)
enableSubmitIfFormIsValid()

form.addEventListener("reset", () => {
	xErrorMessage.innerHTML = ""
	yErrorMessage.innerHTML = ""
})

function tableUpdated() {
	tableBody = document.getElementById("result-table_data")

	redraw(canvas, Number(rInputEl.value))
}