import { AfterContentChecked, Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: '[primePasswordMaxLength]',
})
export class PrimePasswordMaxLengthDirective implements AfterContentChecked {

	@Input('primePasswordMaxLength') length: number;
	private domElement: HTMLElement;

	constructor(private elementRef: ElementRef) {
		this.domElement = this.elementRef.nativeElement as HTMLElement;
	}

	public ngAfterContentChecked(): void {
		const input = this.domElement.querySelector('input');

		if (input) {
			input.setAttribute('maxlength', this.length.toString());
		}
	}
}