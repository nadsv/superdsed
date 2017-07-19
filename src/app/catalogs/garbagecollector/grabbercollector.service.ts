import { Injectable, ViewContainerRef } from '@angular/core';

import { DialogsService } from '../../shared/dialog.service';
import { SedApiService } from '../../shared/sed-api.service';

@Injectable()
export class GrabberCollectorService {
	vcRef: ViewContainerRef; 

	constructor (	private sedAPI: SedApiService,
            		private dialogsService: DialogsService) {

	}

  scann() {
    const data = { mode: 0 };
    return this.sedAPI.fetchData(this.sedAPI.apiUrl + 'garbage-collector', data);
  }

  clear() {
    const data = { mode: 1 };
    return this.sedAPI.fetchData(this.sedAPI.apiUrl + 'garbage-collector', data);
  }

}