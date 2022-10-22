import { Canvas } from "./canvas.js"
import { Clock } from "./clock.js"

const canvas = new Canvas(document.getElementById("graph"), 0, () => { })

Canvas.font.load().then((font) => {
	document.fonts.add(font)

	canvas.redraw()
})

const clock = new Clock(document.getElementById("clock"), 20, 1_000)

Clock.font.load().then((font) => {
	document.fonts.add(font)

	clock.start()
})