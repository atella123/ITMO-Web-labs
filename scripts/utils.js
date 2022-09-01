export function sendForm(form) {
    const formData = new FormData(form)

    return fetch(`script.php?x=${formData.get("x")}&y=${formData.get("y")}&r=${formData.get("r")}`)
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