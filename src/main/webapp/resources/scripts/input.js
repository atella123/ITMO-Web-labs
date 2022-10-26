class Input {

	#input
	#value
	#onChange
	#predicate

	constructor(inputElement, predicate, onChange) {
		this.#input = inputElement
		this.#value = inputElement.value
		this.#onChange = onChange
		this.#predicate = predicate

		inputElement.addEventListener("change", () => this.#changed())
	}

	getValue() {
		return this.#input.value
	}

	getNumericValue() {
		return Number(this.#input.value)
	}

	hasVaildValue() {
		return this.#predicate(this.#input.value)
	}

	#changed() {
		this.#onChange(this.getValue(), this.#value)
		this.#value = this.getValue()
	}
}

class InputButtons {

	#input
	#inputButtons
	#selectedButton

	constructor(inputElement, buttons) {
		this.#input = inputElement
		this.#inputButtons = buttons
		this.#selectedButton = null
	}

	getValue() {
		return this.#input.value
	}

	getNumericValue() {
		return Number(this.#input.value)
	}

	hasVaildValue() {
		return this.#selectedButton !== null
	}

	setValue(val) {
		const selected = this.#inputButtons.find(e => e.innerText === val)

		if (!selected) { return }

		if (this.#selectedButton) { this.#selectedButton.classList.remove('selected') }

		if (selected === this.#selectedButton) {
			this.#selectedButton = null
			return
		}

		selected.classList.add('selected')

		this.#selectedButton = selected
	}
}