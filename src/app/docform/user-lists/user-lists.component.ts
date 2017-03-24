import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-lists',
  templateUrl: './user-lists.component.html',
  styleUrls: ['./user-lists.component.scss']
})
export class UserListsComponent implements OnInit {
	@Input() idDoc: number;
	@Input() users: any;

	constructor() { }

	ngOnInit() {
	}

}
