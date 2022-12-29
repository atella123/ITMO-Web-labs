import { animate, keyframes, state, style, transition, trigger } from "@angular/animations";

export const shake = trigger('shake', [
	state('done', style({
		transform: 'translateX(0)'
	})),
	transition('* => done', animate('700ms ease-in-out', keyframes([
		style({ transform: 'translateX(-1px)', offset: 0 }),
		style({ transform: 'translateX( 2px)', offset: 1 / 8 }),
		style({ transform: 'translateX(-4px)', offset: 1 / 7 }),
		style({ transform: 'translateX( 4px)', offset: 1 / 6 }),
		style({ transform: 'translateX(-4px)', offset: 1 / 5 }),
		style({ transform: 'translateX( 4px)', offset: 1 / 4 }),
		style({ transform: 'translateX(-4px)', offset: 1 / 3 }),
		style({ transform: 'translateX( 2px)', offset: 1 / 2 }),
		style({ transform: 'translateX(-1px)', offset: 1 })
	])))
])