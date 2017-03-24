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
        this.fetchUsers();
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
                    this.dialogsService.inform('Сообщение об ошибке', 'Справочник разделов недоступен: ' + error, false, this.viewContainerRef);
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
                    this.dialogsService.inform('Сообщение об ошибке', 'Список документов незаружен.: ' + error, false, this.viewContainerRef);
                    this.docForm.invalid = true;
                }
            );
        
    }

    fetchUsers() {
        this.sedAPI.fetchData( this.sedAPI.apiUrl + this.sedAPI.urlGetUsers )
              .subscribe(
                items => {
                    this.sedAPI.users = items;
                },
                error => {
                    this.dialogsService.inform('Сообщение об ошибке', 'Справочник пользователей недоступен: ' + error, false, this.viewContainerRef);
                }
            );
    }

	onSubmit( docForm: any ) {
		this.sedAPI.changeData(this.sedAPI.apiUrl + this.sedAPI.urlAddDoc, this.docForm.value)
			.subscribe(
        		( item ) => {
        			this.dialogsService.inform('Сообщение', 'Документ сохранен. Добавьте приложения и исполнителей', false, this.viewContainerRef);
        			this.tabsVisible = true;
                    this.docForm.markAsPristine();
                    this.delBtnVisible = true;
                    window.history.pushState('', '', this.path + '/' + item.id );
                    this.id = item.id;
                    this.sedAPI.id = this.id; 
        		},
        		error => this.dialogsService.inform('Сообщение об ошибке', 'Сохранение данных невозможно: ' + error, false, this.viewContainerRef)
        	);
	}

    onDelete () {

        this.dialogsService.inform('Вопрос', 'Удалить документ?', true, this.viewContainerRef)
                            .subscribe (
                                ( result ) => { if ( result ) { this.deleteDoc() } },
                                () => {}
                            );

    }

    deleteDoc() {
        const item = JSON.stringify({ 'id': this.id});
        this.sedAPI.changeData( this.sedAPI.apiUrl + this.sedAPI.urlDelDoc, item)
            .subscribe (
                () => { 
                        this.docForm.reset();
                        this.tabsVisible = false;
                        this.delBtnVisible = false;
                        this.dialogsService.inform('Сообщение', 'Документ удален', false, this.viewContainerRef)
                            .subscribe (
                                () => this.router.navigate(['/']),
                                () => {}
                            )
                        
                      },
                error => { this.dialogsService.inform('Сообщение об ошибке', 'При удалении документа произошла ошибка: '+ error, false, this.viewContainerRef); }
            ); 
    }

}
