import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	@Input() title: string

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

}
