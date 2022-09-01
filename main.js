import { sendForm, animateInvalid } from "./scripts/utils.js"

const minY = -3
const maxY = 5
const form = document.getElementById("xyrForm")
const rInput = document.getElementById("r-input")
const yInput = document.getElementById("y-input")
const yErrorMessage = document.getElementById("y-error-message")
const tableBody = document.getElementById("result-table-body")
const animationDuration = 700

yInput.addEventListener("change", (event) => {
    animateInvalid(form, animationDuration)
    
    if (yInput.value.length === 0) {
        yErrorMessage.innerHTML = "y value must be present"
        return
    }

    if (yInput.value.length > 10) {
        yErrorMessage.innerHTML = "10 symbols max"
        return
    }

    const yNumValue = Number(yInput.value)

    if (isNaN(yNumValue)) {
        yErrorMessage.innerHTML = "y value must be a number"
        return
    }

    if (yNumValue <= minY || yNumValue >= maxY) {
        yErrorMessage.innerHTML = "y value must be between -3 and 5"
        return
    }

    yErrorMessage.innerHTML = ""
});

for (let rSelector of document.getElementsByClassName("r-selector")) {
    rSelector.addEventListener("click", () => {
        const selected = document.querySelector(".r-selector.selected")
        if (selected) { selected.classList.remove("selected") }

        if (selected != rSelector) {
            rSelector.classList.add("selected")
            rInput.value = rSelector.value
        } else {
            rInput.value = ""
        }

        let rMessage = document.getElementById("r-invalid")
        if (rMessage) {
            rMessage.remove()
        }
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

    sendForm(form)
    .then((response) => {
        const tableRows = response.match(/<tr>\s*((.|\s)*?)\s*<\/tr>/g)

        if (!tableRows || !tableRows.length > 1) {
            animateInvalid(form, failAnimationDuration)
            alert("Invalid server response")
            return
        }

        document.getElementById("result-table").hidden = false
        tableBody.insertAdjacentHTML("beforeend", tableRows[1])
    })
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

