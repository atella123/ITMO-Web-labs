const MS_TO_S = 10 ** 3
export function sendForm(form, table, failAnimationDuration) {
    const XHR = new XMLHttpRequest();

    // Define what happens on successful data submission
    XHR.onload = (event) => {
        const response = JSON.parse(event.target.responseText)

        if (!response || !response.valid) {
            animateInvalid(form, failAnimationDuration)
            return
        }

        console.log(response)

        const row = table.insertRow()

        let cell = row.insertCell()
        cell.innerHTML = formData.get("x")

        cell = row.insertCell()
        cell.innerHTML = formData.get("y")

        cell = row.insertCell()
        cell.innerHTML = formData.get("r")

        cell = row.insertCell()
        cell.innerHTML = response.result ? "Yes!" : "No"
        cell.classList.add(response.result ? "hit" : "miss")

        cell = row.insertCell()
        cell.innerHTML = response.completionTime

        cell = row.insertCell()
        cell.innerHTML = new Date(response.currentTime * MS_TO_S).toUTCString()

        table.hidden = false
    }

    // Define what happens in case of error
    XHR.addEventListener("error", () => {
        alert('Oops! Something went wrong:');
    });

    const formData = new FormData(form)

    // Set up our request
    XHR.open("GET", `/script.php?x=${formData.get("x")}&y=${formData.get("y")}&r=${formData.get("r")}`);

    // The data sent is what the user provided in the form
    XHR.send()
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