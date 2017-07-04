import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SedApiService } from '../shared/sed-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	reloadDoc() {
		if (this.router.navigated === false) {
    		this.router.navigateByUrl('/doc/0');
  		} else {
    		this.router.navigateByUrl(`/index`).then(
      			() => {
        			this.router.navigateByUrl(`/doc/0`);
      		});
  		}
	}

}
