import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { DialogsService } from '../shared/dialog.service';
import { SedApiService } from '../shared/sed-api.service';

@Component({
	selector: 'app-docform',
	templateUrl: './docform.component.html',
	styleUrls: ['./docform.component.scss']
})
export class DocformComponent implements OnInit {
	docForm: FormGroup;
	doc: any = {};
    id: number;
    urlDoc: string = 'doc.php?id=';
    urlAddDoc: string = 'add-doc.php?id=';

	constructor(private sedAPI: SedApiService, 
		        private route: ActivatedRoute,
		        private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) { 
	}

	ngOnInit() {
		const currentDate = new Date();
		const formatDate = currentDate.toISOString().substring(0, 10);

		this.docForm = new FormGroup({
      		num: new FormControl('', [Validators.required, Validators.minLength(3)]),
      		status: new FormControl(''),
      		base: new FormControl(''),
      		date: new FormControl(formatDate, Validators.required),
      		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      		section: new FormControl('', [Validators.required]),
      		maindoc: new FormControl('')
      	});
	}

	onSubmit( docForm: any ) {
		console.log(this.docForm.value);
		/*this.sedAPI.saveData(this.sedAPI.apiUrl+this.urlAddDoc, this.docForm.value)
			.subscribe(
        		() => {},
        		error => console.log('Error saving data!'));*/
        this.dialogsService
      	.confirm('Сообщение об ошибке', 'Сохранение данных невозможно.', this.viewContainerRef);
	}

}
