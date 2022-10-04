export async function sendData(data) {
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
			alert("error!")
		})
}

export function animateInvalid(element, animationDuration) {
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
