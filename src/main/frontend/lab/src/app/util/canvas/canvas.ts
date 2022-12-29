export function drawLine(ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern, x: number, y: number, width: number, height: number, lineWidth: number) {
	const oldColor = ctx.fillStyle

	const angle = Math.atan(width / height)

	const xshift = lineWidth / 2 * Math.cos(angle)
	const yshift = lineWidth / 2 * Math.sin(angle)

	ctx.fillStyle = color

	ctx.beginPath()
	ctx.arc(x, y, lineWidth / 2, 0, 2 * Math.PI)
	ctx.fill()

	ctx.beginPath()
	ctx.arc(x + width, y + height, lineWidth / 2, 0, 2 * Math.PI)
	ctx.fill()

	ctx.beginPath()
	ctx.moveTo(x - xshift, y + yshift)
	ctx.lineTo(x + xshift, y - yshift)
	ctx.lineTo(x + xshift + width, y - yshift + height)
	ctx.lineTo(x - xshift + width, y + yshift + height)
	ctx.fill()

	ctx.fillStyle = oldColor
}

export function easeOutBounce(x: number) {
	const n1 = 7.5625;
	const d1 = 2.75;

	if (x < 1 / d1) {
		return n1 * x * x;
	}
	if (x < 2 / d1) {
		x -= 1.5 / d1
		return n1 * x * x + 0.75;
	}
	if (x < 2.5 / d1) {
		x -= 2.25 / d1
		return n1 * x * x + 0.9375;
	}
	x -= 2.625 / d1
	return n1 * x * x + 0.984375;
}
