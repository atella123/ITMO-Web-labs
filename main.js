import { sendForm, animateInvalid, removeLastChar } from "./scripts/utils.js"

const minY = -3
const maxY = 5
const form = document.getElementById("xyrForm")
const rInput = document.getElementById("r-input")
const yInput = document.getElementById("y-input")
const table = document.getElementById("result-table")
const animationDuration = 700

yInput.addEventListener("input", (changeEvent) => {
    const newValue = changeEvent.target.value
    const numericValue = Number(newValue)
    if (isNaN(numericValue) || newValue < minY || newValue > maxY) {
        changeEvent.target.value = removeLastChar(newValue)
    }
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
    })
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    const yValidy = yInput.value.length !== 0
    const rValidy = rInput.value.length !== 0

    if (!yValidy || !rValidy) {
        animateInvalid(form, animationDuration)
        if (!yValidy) {
            yInput.setAttribute("placeholder", "enter value")
        }
        if (!rValidy) {
            if (!rInput.classList.contains("invalid")) {
                rInput.insertAdjacentHTML("afterend", '<sub class="invalid-message" id="r-invalid">value must be presented</sub>')
                rInput.classList.add("invalid")
            }
        }
        return
    }

    sendForm(form, table, animationDuration);
});

form.addEventListener("reset", () => {
    rInput.value = ""

    let rMessage = document.getElementById("r-invalid")
    if (rMessage) {
        rMessage.remove()
    }

    const selected = document.querySelector(".r-selector.selected")
    if (selected) { selected.classList.remove("selected") }

    yInput.setAttribute("placeholder", "-3 ≤ y ≤ 5")
    rInput.classList.remove("invalid")
});

