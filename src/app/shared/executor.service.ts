import { Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { DialogsService } from '../shared/dialog.service';
import { SedApiService } from '../shared/sed-api.service';

@Injectable()
export class ExecutorService {
	vcRef: ViewContainerRef; 
  private executors: Array<any> = [];
  users: Array<any> = [];
  groups: Array<any> = [];

	constructor (	private sedAPI: SedApiService,
                private router: Router, 
            		private dialogsService: DialogsService) {

	}

	fetchLists() {
    const currentDate = new Date();
    const strDate = currentDate.toISOString().substring(0, 10);
    if (strDate === localStorage.getItem('date'))  {
      this.executors = JSON.parse(localStorage.getItem('users'));
      this.formUserLists();
    } else {
        this.sedAPI.fetchData( this.sedAPI.apiUrl + 'users' )
              .subscribe(
                items => {
                    console.log('Local storage ', items);
                    localStorage.clear();
                    localStorage.setItem('users', JSON.stringify(items));
                    localStorage.setItem('date', currentDate.toISOString().substring(0, 10));
                    this.executors = items;
                    this.formUserLists();
                },
                error => this.dialogsService.inform('Сообщение об ошибке', 'Невозможно проинициализировать справочники: ' + error, false, this.vcRef)
            )
        }
    }

    formUserLists() {
      this.groups = this.executors.filter( item => item['type'] === 1).map( item => item['depart'] );
      this.users =  this.executors.filter( item => item['type'] === 0);
    }
}