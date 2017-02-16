import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogsService } from '../shared/dialog.service';
import { SedApiService } from '../shared/sed-api.service';
import { Section } from '../shared/section';
import { formatDatefromMySQL } from '../shared/date-format';

@Component({
	selector: 'app-docform',
	templateUrl: './docform.component.html',
	styleUrls: ['./docform.component.scss']
})
export class DocformComponent implements OnInit {
	docForm: FormGroup;
	doc: any = {};
	mainDocs: any[];
	sections: Section[];
    id: number;
    tabsVisible: boolean;
    delBtnVisible: boolean;
    path: string;

	constructor(private sedAPI: SedApiService, 
		        private route: ActivatedRoute,
                private router: Router,
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

      	this.tabsVisible = false;
        this.fetchSections();
        this.fetchMainDocs();
        this.route.url.subscribe( (url) => this.path = url[0].path );
        this.route.params.subscribe( (params) => this.delBtnVisible = ( +params['id'] ) ? true : false );
        
	}

    fetchSections() {
        this.sedAPI.fetchData( this.sedAPI.apiUrl+this.sedAPI.urlGetSections )
              .subscribe(
                items => {
                    this.sections = items;
                },
                error => {
                    this.dialogsService.confirm('Сообщение об ошибке', 'Справочник разделов недоступен: ' + error, this.viewContainerRef);
                    this.docForm.invalid = true;
                }
            );
    }

    fetchMainDocs() {
        this.sedAPI.fetchData( this.sedAPI.apiUrl+this.sedAPI.urlGetMainDocs )
              .subscribe(
                items => {
                    this.mainDocs = [];
                    for ( let item of items ) {
                        item.date = formatDatefromMySQL( item.date ); 
                        this.mainDocs.push( item );
                    }
                },
                error => {
                    this.dialogsService.confirm('Сообщение об ошибке', 'Список документов незаружен.: ' + error, this.viewContainerRef);
                    this.docForm.invalid = true;
                }
            );
        
    }

	onSubmit( docForm: any ) {
		this.sedAPI.changeData(this.sedAPI.apiUrl+this.sedAPI.urlAddDoc, this.docForm.value)
			.subscribe(
        		( item ) => {
        			this.dialogsService.confirm('Сообщение', 'Документ сохранен. Добавьте приложения и исполнителей', this.viewContainerRef);
        			this.tabsVisible = true;
                    this.docForm.markAsPristine();
                    this.delBtnVisible = true;
                    window.history.pushState('', '', this.path + '/' + item.id );
                    this.id = item.id;
        		},
        		error => this.dialogsService.confirm('Сообщение об ошибке', 'Сохранение данных невозможно: ' + error, this.viewContainerRef)
        	);
	}

    onDelete () {
        const item = JSON.stringify({ 'id': this.id});
        this.sedAPI.changeData( this.sedAPI.apiUrl + this.sedAPI.urlDelDoc, item)
            .subscribe (
                () => { 
                        this.docForm.reset();
                        this.dialogsService.confirm('Сообщение', 'Документ удален', this.viewContainerRef);
                        this.router.navigate(['/' + this.path, 0]);
                        this.tabsVisible = false;
                        this.delBtnVisible = false;
                        this.docForm.markAsPristine();
                      },
                error => { this.dialogsService.confirm('Сообщение об ошибке', 'При удалении документа произошла ошибка: '+ error, this.viewContainerRef); }
            );
    }

}
