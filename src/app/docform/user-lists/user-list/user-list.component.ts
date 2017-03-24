import { Component, OnInit, Input } from '@angular/core';
import { SedApiService } from '../../../shared/sed-api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	@Input() title: string;
	@Input() idDoc: number;
	@Input() items: any[] = [];

	constructor(private sedAPI: SedApiService) { }

	ngOnInit() {
		let itemSet;
		switch( this.title ) {
  			case 'Сотрудники':  
	  			this.items = this.sedAPI.users.map( item => item['name'] );
	    		break;
    		case 'Группы':  
	  			this.items = this.sedAPI.users.map( item => item['depart'] ).sort();
	  			this.items = this.items.filter((x, i, a) => a.indexOf(x) == i);
	    		break;
		}
	}

}
