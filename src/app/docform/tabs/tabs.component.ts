import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SedApiService } from '../../shared/sed-api.service';
import { DialogsService } from '../../shared/dialog.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
	activeTab: number = 0;
	ID: number;
	changes: number;

	constructor(private sedAPI: SedApiService,
		        private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.ID =  this.sedAPI.id;
		this.changes = this.sedAPI.changes.length;
	}

	onClick(event, i) {
	  	this.activeTab = i;
	}

	getContentStyle(i) {
		if (this.activeTab == i) {
			return "block";
		} else {
			return "none";
		}
	}

	getHeaderStyle(i) {
		if (this.activeTab == i) {
			return "#ccc";
		} else {
			return "inherit";
		}
	}

}
