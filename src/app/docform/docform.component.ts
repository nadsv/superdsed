import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogsService } from '../shared/dialog.service';
import { SedApiService } from '../shared/sed-api.service';
import { formatDatefromMySQL } from '../shared/date-format';

@Component({
	selector: 'app-docform',
	templateUrl: './docform.component.html',
	styleUrls: ['./docform.component.scss']
})
export class DocformComponent implements OnInit {
	docForm: FormGroup;
	doc: any = {};
	mainDocs: any[] = [];
	sections: any[] = [];
    id: number;
    tabsVisible: boolean = false;
    delBtnVisible: boolean = false;
    path: string;

	constructor(private sedAPI: SedApiService, 
		        private route: ActivatedRoute,
                private router: Router,
		        private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) {
                 
	}

	ngOnInit() {
        this.sedAPI.links = [];
        this.sedAPI.changes = [];

        this.route.url.subscribe( (url) => this.path = url[0].path);
        this.route.params.subscribe( 
            (params) => {
                this.id = +params['id'];
                this.fetchData( this.id ); 
            } 
        ); 
		const currentDate = new Date();
		const formatDate = currentDate.toISOString().substring(0, 10);

		this.docForm = new FormGroup({
      		num: new FormControl('', [Validators.required, Validators.minLength(3)]),
      		status: new FormControl(''),
      		base: new FormControl(''),
      		date: new FormControl(formatDate, Validators.required),
      		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      		section: new FormControl('', Validators.required),
      		maindoc: new FormControl('')
      	});

	}

    fetchData( id ) {
        this.sedAPI.fetchData(this.sedAPI.apiUrl + this.sedAPI.urlGetLists)
            .subscribe(
                ( items ) => {
                    this.mainDocs = items['maiDocs'];
                    this.sections = items['sections'];
                    this.fetchDoc( id );
                },
                error => this.dialogsService.inform('Сообщение об ошибке', 'Невозможно проинициализировать документ: ' + error, false, this.viewContainerRef)
            );

    }

    fetchDoc( id ) {
        if ( +id ) {
        this.sedAPI.fetchData(this.sedAPI.apiUrl + this.sedAPI.urlGetDoc + `?id=${id}`)
            .subscribe(
                ( item ) => {
                    const doc = item.doc[0];
                    this.sedAPI.links = item.links;
                    this.sedAPI.changes = item.changes;
                    this.sedAPI.executors = item.executors;
                    this.docForm.controls['num'].setValue(doc.num);
                    this.docForm.controls['date'].setValue(doc.date);
                    this.docForm.controls['name'].setValue(doc.name);
                    this.docForm.controls['base'].setValue(doc.base);
                    this.docForm.controls['status'].setValue( +doc.status );
                    this.docForm.controls['section'].setValue(doc.id_section);
                    this.docForm.controls['maindoc'].setValue(doc.main_doc);
                    this.tabsVisible = true;
                    this.delBtnVisible = true;
                },
                error => { this.dialogsService.inform('Сообщение об ошибке', 'Документ не найден' + error, false, this.viewContainerRef) }
            );
        }
    }

	onSubmit( docForm: any ) {
		this.sedAPI.changeData(this.sedAPI.apiUrl + this.sedAPI.urlAddDoc, this.docForm.value)
			.subscribe(
        		( item ) => {
        			this.tabsVisible = true;
                    this.docForm.markAsPristine();
                    this.delBtnVisible = true;
                    this.router.navigate([this.path + '/' + item.id])
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
