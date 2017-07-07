import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SedApiService } from '../shared/sed-api.service';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { DialogsService } from '../shared/dialog.service';
import { decodeHtml } from '../shared/lib.module';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.scss']
})
export class SearchformComponent implements OnInit {
	searchForm: FormGroup;
	uploading: boolean;
	docs: any;
	users: any;
	groups: any;

	constructor(private sedAPI: SedApiService,
		        private dialogsService: DialogsService,
		        private viewContainerRef: ViewContainerRef) {
	}

	ngOnInit() {
		this.docs = [];
		this.uploading = false;
		if (localStorage.getItem('searchForm')) {
			const searchForm = JSON.parse(localStorage.getItem('searchForm'));
			this.searchForm = new FormGroup({
      		num: new FormControl(searchForm.num),
	      		status: new FormControl(searchForm.status),
	      		base: new FormControl(searchForm.base),
	      		dateFrom: new FormControl(searchForm.dateFrom),
	      		dateTo: new FormControl(searchForm.dateTo),
	      		user: new FormControl(searchForm.user),
	      		group: new FormControl(searchForm.group),
	      		name: new FormControl(searchForm.name)
      		});
      		this.searchForm.markAsDirty();
      		if (localStorage.getItem('searchResult')) {
	  			this.docs = JSON.parse(localStorage.getItem('searchResult'));
	  		}
      	 } else {
			this.searchForm = new FormGroup({
      		num: new FormControl(),
	      		status: new FormControl(),
	      		base: new FormControl(),
	      		dateFrom: new FormControl(),
	      		dateTo: new FormControl(),
	      		user: new FormControl(),
	      		group: new FormControl(),
	      		name: new FormControl()
      	})	
			}
      	this.users = this.sedAPI.users;
    	this.groups = this.sedAPI.users.map( item => item['depart'] ).sort();
	  	this.groups = this.groups.filter((x, i, a) => a.indexOf(x) == i); //get unique values
	  	this.groups.unshift( 'BCE' );
	}

	
	onSubmit( searchForm: any ){
		this.docs = [];
		localStorage.setItem('searchForm', JSON.stringify(searchForm.value));
		localStorage.setItem('searchPage', JSON.stringify(1));
		this.sedAPI.fetchData(this.sedAPI.apiUrl + 'get-search-results', searchForm.value)
            .subscribe(
                ( items ) => {  
                	this.docs = items.map(item => {item.name = decodeHtml(item.name); return item;});
                	localStorage.setItem('searchResult', JSON.stringify(this.docs));
                },
                error => { 
                	this.dialogsService.inform('Сообщение об ошибке', 'Невозможно получить список документов.' , false, this.viewContainerRef) 
                }
            );
	}

	onClear() {
		this.docs = [];
		this.searchForm.reset();
		localStorage.removeItem('searchForm');
		localStorage.removeItem('searchResult');
		localStorage.removeItem('searchPage');
	}

}