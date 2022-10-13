export class Input {

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
