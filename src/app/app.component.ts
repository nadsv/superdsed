import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SedApiService } from './shared/sed-api.service';
import { DialogsService } from './shared/dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'СЭД46';

	constructor(private sedAPI: SedApiService,
				private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) { 
	}

	ngOnInit() {
		this.fetchLists();
	}

	fetchLists() {
		const currentDate = new Date();
		const strDate = currentDate.toISOString().substring(0, 10);
		if (strDate === localStorage.getItem('date'))  {
			this.sedAPI.users = JSON.parse(localStorage.getItem('users'));
		} else {
        this.sedAPI.fetchData( this.sedAPI.apiUrl + 'users' )
              .subscribe(
                items => {
                	localStorage.clear();
                    this.sedAPI.users = items;
					localStorage.setItem('users', JSON.stringify(items));
					localStorage.setItem('date', currentDate.toISOString().substring(0, 10));
					this.sedAPI.users = JSON.parse(localStorage.getItem('users'));
                },
                error => this.dialogsService.inform('Сообщение об ошибке', 'Невозможно проинициализировать справочники: ' + error, false, this.viewContainerRef)
            )
        }
    }

}
