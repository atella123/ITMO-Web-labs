import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AreaService, AREA_REQUEST_SERVICE } from 'src/app/services/area/area-request.service';
import { shake } from 'src/app/util/animations';

@Component({
	selector: 'app-area-form',
	templateUrl: './area-form.component.html',
	styleUrls: ['./area-form.component.css'],
	animations: [shake]
})
export class AreaFormComponent implements OnInit {

	public areaForm: FormGroup

	public xValues = [-3, -2, -1, '0', 1, 2, 3, 4, 5]
	public selectedXValues: number[] = []

	public rValues = [-3, -2, -1, '0', 1, 2, 3, 4, 5]
	public selectedRValues: number[] = []

	public currentYValue: number = 0

	public animateInvalid: string

	constructor(
		@Inject(AREA_REQUEST_SERVICE) private areaService: AreaService,
		private fb: FormBuilder
	) { }

	ngOnInit(): void {
		this.areaForm = this.fb.group({
			x: new FormControl(this.selectedXValues, Validators.required),
			y: 0,
			r: new FormControl(this.selectedRValues, Validators.required)
		})

		this.areaForm.valueChanges.subscribe((v) => {
			this.currentYValue = v.y < 0 ? v.y : ' ' + v.y
			this.areaService.setR(v.r.length == 0 ? 0 : v.r[0])
		})
	}

	stopAnimation() {
		this.animateInvalid = ''
	}

	checkPoint(): void {
		if (!this.areaForm.valid) {
			this.animateInvalid = 'done'
			return
		}

		const res = this.areaService.checkPoint({
			x: this.areaForm.get('x')?.value[0],
			y: this.areaForm.get('y')?.value
		})

		if (!res) {
			this.animateInvalid = 'done'
		}
	}
}
