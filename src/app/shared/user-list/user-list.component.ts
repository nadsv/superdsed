import { Component, OnInit, OnDestroy, Input, ViewContainerRef } from '@angular/core';
import { SedApiService } from '../../shared/sed-api.service';
import { DialogsService } from '../../shared/dialog.service';
import { ExecutorService } from '../../shared/executor.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	@Input() type: string;
	@Input() role: number;
	title: string;
	items: any[] = [];
	opted: any[] = [];
	private docSubsription: Subscription;

	constructor(private sedAPI: SedApiService,
				private executor: ExecutorService,
				private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.setExecutors();
		this.docSubsription = this.sedAPI.docChanged
  		.subscribe( 
  			( id ) => { this.setExecutors(); }
  		);
	}

	ngOnDestroy() {
		this.docSubsription.unsubscribe();
	}

	setExecutors() {
				this.items = [];
		this.opted = [];
		if (this.sedAPI.executors.length) {
			this.opted = this.sedAPI.executors.filter(x => x.type == this.type);
		}
		switch( this.type ) {
  			case '0':  
	  			this.items = this.executor.users.filter(x => x.type == this.type);;
	  			this.items = this.items.filter( item => this.opted.map(x => x.name ).indexOf( item.name ) < 0 ); //exclude opted items
	  			this.title = 'Сотрудники';
	    		break;
    		case '1':  
	  			this.items = this.executor.groups;
	  			this.items = this.items.filter((x, i, a) => a.indexOf(x) == i); //get unique values
	  			this.items = this.items.filter( item => this.opted.map(x => x.name ).indexOf( item ) < 0 ); //exclude opted items
	  			this.items = this.items.map( item => ({name: item, depart: item, post: item}));
	  			this.title = 'Группы';
	    		break;
		}
	}

	chooseItem( i ) {
		const choosedItem = {id: 0, 
							id_doc: this.sedAPI.id, 
							name: this.items[i].name, 
							depart: this.items[i].depart, 
							post: this.items[i].post,
							type: +this.type, 
							role: +this.role 
		};
		const item = JSON.stringify(choosedItem); 

		this.sedAPI.changeData(this.sedAPI.apiUrl + 'update-user-to-save', item)
			.subscribe(
				(item) => {
						this.items.splice( i, 1 );
						choosedItem.id = item.id;
						this.opted.unshift( choosedItem );
						this.sedAPI.listsChanged = true;
				},
				() => this.dialogsService.inform('Сообщение об ошибке', 'Запись не была добавлена!', false, this.viewContainerRef)
			);
	}

	retrieveItem ( i ) {
		const item = JSON.stringify({ 'id': this.opted[i].id});

		this.sedAPI.changeData(this.sedAPI.apiUrl + 'update-user-to-del', item)
			.subscribe(
				() => {
					this.items.push(this.opted[i]);
					this.items.sort((a, b) => { if (a.name < b.name) return -1; else if (a.name > b.name) return 1; else return 0;});
					this.opted.splice( i, 1 );
					this.sedAPI.listsChanged = true;
				},
				() => this.dialogsService.inform('Сообщение об ошибке', 'Запись не была удалена!', false, this.viewContainerRef)
			);
	}

}
