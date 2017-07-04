import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { DialogsService } from '../../shared/dialog.service';
import { SedApiService } from '../../shared/sed-api.service';

@Component({
  selector: 'app-sectioncatalog',
  templateUrl: './sectioncatalog.component.html',
  styleUrls: ['./sectioncatalog.component.scss']
})
export class SectioncatalogComponent implements OnInit {
	items: any[];
	itemForm: FormGroup;

	constructor(private sedAPI: SedApiService, 
        private dialogsService: DialogsService, 
        private viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.itemForm = new FormGroup({
      		item: new FormControl('', [Validators.required, Validators.minLength(3)]) 
      	});
      	this.sedAPI.fetchData(this.sedAPI.apiUrl + 'sections')
			.subscribe(items => {this.items = items }, error => {console.log(error)});
	}

	onSubmit(itemForm: any) {
		this.sedAPI
        		.changeData(this.sedAPI.apiUrl + 'add-section', this.itemForm.value)
        		.subscribe((item) => { 
        					this.items.unshift(item);
        					this.itemForm.patchValue({'item': ''});
        				},
        				(error) => 
        				{ this.dialogsService.inform('Сообщение об ошибке', 'Раздел не был добавлен!', false, this.viewContainerRef)}) ;
	}

    onDelete(id, i) {
		const item = JSON.stringify({ 'id': id});
		this.sedAPI.changeData(this.sedAPI.apiUrl + 'delete-section', item)
			.subscribe(
				() => {this.items.splice( i, 1 )},
				() => this.dialogsService.inform('Сообщение об ошибке', 'Запись не может быть удалена!', false, this.viewContainerRef)
			)
	}

}
