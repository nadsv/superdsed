import { Component, OnInit, Input } from '@angular/core';
import { SedApiService } from '../../../shared/sed-api.service';

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

	constructor(private sedAPI: SedApiService) { }

	ngOnInit() {
		this.items = [];
		this.opted = [];
		if (this.sedAPI.executors.length) {
			this.opted = this.sedAPI.executors.filter(x => x.type == this.type);
		}
		switch( this.type ) {
  			case '0':  
	  			this.items = this.sedAPI.users.map( item => item['name'] ).sort();
	  			this.items = this.items.filter( item => this.opted.map(x => x.name ).indexOf( item ) < 0 ); //exclude opted items
	  			this.title = 'Сотрудники';
	    		break;
    		case '1':  
	  			this.items = this.sedAPI.users.map( item => item['depart'] ).sort();
	  			this.items = this.items.filter((x, i, a) => a.indexOf(x) == i); //get unique values
	  			this.items.unshift( 'BCE' );
	  			this.items = this.items.filter( item => this.opted.map(x => x.name ).indexOf( item ) < 0 ); //exclude opted items
	  			this.title = 'Группы';
	    		break;
		}
	}

	chooseItem( i ) {
		let choosedItem = {name: this.items[i], type: +this.type, role: +this.role };
		this.items.splice( i, 1 );
		this.opted.push( choosedItem );
	}

	retrieveItem ( i ) {
		this.items.push(this.opted[i].name);
		this.items.sort();
		this.opted.splice( i, 1 );
	}

}
