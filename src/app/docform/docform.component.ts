import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DialogsService } from '../shared/dialog.service';
import { SedApiService } from '../shared/sed-api.service';
import { decodeHtml } from '../shared/lib.module';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
	selector: 'app-docform',
	templateUrl: './docform.component.html',
	styleUrls: ['./docform.component.scss']
})
export class DocformComponent implements OnInit, CanComponentDeactivate {
	docForm: FormGroup;
	doc: any = {};
	mainDocs: any[] = [];
	sections: any[] = [];
    id: number;
    tabsVisible: boolean = false;
    delBtnVisible: boolean = false;
    path: string;
    uploading: boolean;

	constructor(private sedAPI: SedApiService, 
		        private route: ActivatedRoute,
                private router: Router,
		        private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) {
                 
	}

	ngOnInit() {
        this.sedAPI.links = [];
        this.sedAPI.changes = [];
        this.sedAPI.executors = [];
        this.sedAPI.listsChanged = false;
        this.uploading = false;

        this.route.url.subscribe( (url) => this.path = url[0].path);
        this.route.params.subscribe( 
            (params) => {
                this.id = +params['id'];
                this.sedAPI.id = this.id;
                this.fetchData( this.id ); 
            } 
        ); 
		const currentDate = new Date();
		const formatDate = currentDate.toISOString().substring(0, 10);

		this.docForm = new FormGroup({
      		num: new FormControl('', [Validators.required, Validators.minLength(1)]),
      		cancellationDate: new FormControl(''),
      		base: new FormControl(''),
      		date: new FormControl(formatDate, Validators.required),
      		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      		section: new FormControl('', Validators.required),
      		maindoc: new FormControl(''),
            id: new FormControl(0)  
      	});

	}

    private fetchData( id ) {
        this.sedAPI.fetchData(this.sedAPI.apiUrl + 'lists')
            .subscribe(
                ( items ) => {
                    this.mainDocs = items['maiDocs'];
                    this.sections = items['sections'];
                    this.fetchDoc( id );
                },
                error => this.dialogsService.inform('Сообщение об ошибке', 'Невозможно проинициализировать документ.' , false, this.viewContainerRef)
            );

    }

    private fetchDoc( id ) {
        if ( +id ) {
        const data = { id: id };
        this.sedAPI.fetchData(this.sedAPI.apiUrl + 'get-doc', data)
            .subscribe(
                ( item ) => {
                    const doc = item.doc[0];
                    this.sedAPI.links = item.links.map(item => {item.name = decodeHtml(item.name); return item});
                    this.sedAPI.changes = item.changes.map(item => {item.name = decodeHtml(item.num); return item});;
                    this.sedAPI.executors = item.executors;
                    this.docForm.controls['num'].setValue(decodeHtml(doc.num));
                    this.docForm.controls['date'].setValue(doc.date);
                    this.docForm.controls['name'].setValue(decodeHtml(doc.name));
                    this.docForm.controls['base'].setValue(decodeHtml(doc.base));
                    this.docForm.controls['cancellationDate'].setValue( doc.cancellation_date );
                    this.docForm.controls['section'].setValue(doc.id_section);
                    this.docForm.controls['maindoc'].setValue(doc.main_doc);
                    this.docForm.controls['id'].setValue( id );
                    this.tabsVisible = true;
                    this.delBtnVisible = true;
                },
                error => { this.dialogsService.inform('Сообщение об ошибке', 'Документ не найден.', false, this.viewContainerRef) }
            );
        }
    }

	onSubmit( docForm: any ) {
        this.uploading = true;
        if ( +this.id == 0) {
		this.sedAPI.changeData(this.sedAPI.apiUrl + 'add-doc', this.docForm.value)
			.subscribe(
        		( item ) => {
        			this.tabsVisible = true;
                    this.delBtnVisible = true;
                    this.router.navigate([this.path + '/' + item.id]);
                    this.id = item.id;
                    this.sedAPI.id = this.id; 
                    this.uploading = false;
        		},
        		error => {
                    this.dialogsService.inform('Сообщение об ошибке', 'Сохранение данных невозможно.', false, this.viewContainerRef);
                    this.uploading = false;
                }
        	); 
        } else {
            let item = { 'data': this.docForm.value, 'updateDoc': 0, 'updateLists': 0 }; 
            if (this.docForm.dirty) { item.updateDoc = 1} ;  
            if (this.sedAPI.changeData)  { item.updateLists = 1} ;
            this.sedAPI.changeData(this.sedAPI.apiUrl + 'update-doc', JSON.stringify(item))
            .subscribe(
                ( item ) => {  this.uploading = false; },
                error => {
                    this.dialogsService.inform('Сообщение об ошибке', 'Обновление данных невозможно.', false, this.viewContainerRef);
                    this.uploading = false;
                }
            );
        }
	}

    private onDelete () {

        this.dialogsService.inform('Вопрос', 'Удалить документ?', true, this.viewContainerRef)
                            .subscribe (
                                ( result ) => { if ( result ) { this.deleteDoc() } },
                                () => {}
                            );

    }

    private deleteDoc() {
        const item = JSON.stringify({ 'id': this.id});
        this.sedAPI.changeData( this.sedAPI.apiUrl + 'del-doc', item)
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
                error => { this.dialogsService.inform('Сообщение об ошибке', 'При удалении документа произошла ошибка.', false, this.viewContainerRef); }
            ); 
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

}
