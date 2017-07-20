import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { DialogsService } from './shared/dialog.service';
import { SedApiService } from './shared/sed-api.service';
import { ExecutorService } from './shared/executor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'СЭД46';

	constructor(private sedAPI: SedApiService,
				private dialogsService: DialogsService, 
				private executors: ExecutorService,
                private viewContainerRef: ViewContainerRef) { 
	}

	ngOnInit() {
		this.executors.vcRef = this.viewContainerRef;
		this.executors.fetchLists();
	}

}
