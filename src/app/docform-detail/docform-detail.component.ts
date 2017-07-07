import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DialogsService } from '../shared/dialog.service';
import { SedApiService } from '../shared/sed-api.service';
import { Doc } from '../shared/doc.model';

@Component({
	selector: 'app-docform-detail',
	templateUrl: './docform-detail.component.html',
	styleUrls: ['./docform-detail.component.scss']
})
export class DocformDetailComponent implements OnInit {
	id: number;
	doc: Doc = new Doc(0, '', '', '', '', '', '', '', '', [], [], []);

	constructor(private sedAPI: SedApiService, 
                private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef,
                private route: ActivatedRoute) { }

	ngOnInit() {
		this.sedAPI.links = [];
        this.sedAPI.changes = [];
        this.sedAPI.executors = [];
        this.route.params.subscribe( 
            (params) => {
                this.id = +params['id'];
                this.sedAPI.id = this.id;
                 this.fetchDoc( this.id ); 
            } 
        ); 
	}

	private fetchDoc( id ) {
        if ( +id ) {
        const data = { id: id };
        this.sedAPI.fetchData(this.sedAPI.apiUrl + 'get-doc-detail', data)
            .subscribe(
                ( item ) => {
                    this.doc = new Doc( +id, 
                    	item.num, 
                    	item.date, 
                    	item.name,
                    	item.base,
                    	item.cancellation_date,
                    	item.main_num,
                    	item.main_date,
                    	item.section,
                    	item.links,
                        item.changes,
                    	item.executors
                    	);

                    this.doc.executors.map(
                        (executor) => {
                            executor.name = (executor.type === '1') ? executor.name : `${executor.name} (${executor.depart})`;
                            return executor;
                            }
                        );

                    this.doc.texts = this.doc.links.filter(
                        (text) => {
                            return (text.type === '1') ? true : false
                            }
                        ).map((text) => {
                            text.link = `${this.sedAPI.dataUrl}${this.id}/${text.type}/${text.name}`; 
                            return text;
                        }
                        );
                    console.log(this.doc.texts);

                    this.doc.applications = this.doc.links.filter(
                        (application) => {
                            return (application.type === '2') ? true : false
                            }
                        ).map((application) => {
                            application.link = `${this.sedAPI.dataUrl}${this.id}${application.type}/${application.name}`; 
                            return application;
                        }
                        );
                },
                error => { this.dialogsService.inform('Сообщение об ошибке', 'Документ не найден.', false, this.viewContainerRef) }
            );
        }
    }

}
