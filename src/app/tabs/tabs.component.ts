import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
	activeTab: number = 0;

	constructor() { }

	ngOnInit() {
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
