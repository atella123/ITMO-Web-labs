export function sendForm(form, table, failAnimationDuration) {
    const formData = new FormData(form)

    fetch(`/script.php?x=${formData.get("x")}&y=${formData.get("y")}&r=${formData.get("r")}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.text();
        })
        .then((response) => {
            const tableRows = response.match(/<tr>\s*((.|\s)*?)\s*<\/tr>/g)

            if (!tableRows || !tableRows.length > 1) {
                animateInvalid(form, failAnimationDuration)
                alert("Invalid server response")
                return
            }

            table.insertAdjacentHTML("beforeend", tableRows[1])
        })
}

export function removeLastChar(str) {
    return str.substring(0, str.length - 1)
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