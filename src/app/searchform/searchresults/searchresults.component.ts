import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.scss']
})
export class SearchresultsComponent implements OnInit {
	@Input() docs: any;
	startIndex: number;
	endIndex: number;
	totalPages: number;
	isShowing: boolean;

	constructor(private router: Router) { }

	ngOnInit() {
		this.startIndex = 0;
		this.endIndex = 0;
		this.totalPages = 0;
	}

	onResultRowClick( index ) {
		this.router.navigate([ '\doc-detail', index ]);
	}

	onPageChanged(range: any) {
		this.startIndex = range.startIndex;
		this.endIndex = range.endIndex;
		this.totalPages = range.totalPages;
	} 

}