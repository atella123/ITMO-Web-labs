async function sendData(data) {
	return fetch(
		"",
		{
			method: "POST",
			body: JSON.stringify(data)
		}
	)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			return response.text();
		})
		.catch(() => {
			alert("error when trying to submit request!")
		})
}

function animateInvalid(element, animationDuration) {
	element.animate(
		[
			{ transform: "translateX(-1px)" },
			{ transform: "translateX( 2px)" },
			{ transform: "translateX(-4px)" },
			{ transform: "translateX( 4px)" },
			{ transform: "translateX(-4px)" },
			{ transform: "translateX( 4px)" },
			{ transform: "translateX(-4px)" },
			{ transform: "translateX( 2px)" },
			{ transform: "translateX(-1px)" }
		],
		{ duration: animationDuration }
	)
}

function createColor() {
	const randomColorVal = () => { return Math.round(Math.random() * 255) }
	return `hsl(${randomColorVal()},100%,40%)`
}

function easeOutBounce(x) {
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

function createTextInputValidator(predicate, errorMsgElem, errorMsg) {
	return (newValue, oldValue) => {
		if (predicate(newValue)) {
			errorMsgElem.innerText = ""
		} else {
			errorMsgElem.innerText = errorMsg
		}
	}
}
