import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagerService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [ PagerService ]
})
export class PaginationComponent implements OnInit {
	@Input() length;
	@Output() onPageChanged = new EventEmitter<any>();

	constructor(private pagerService: PagerService) { }

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit() {
        // initialize to page 1
        this.setPage(+localStorage.getItem('searchPage') || 1);
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.pager = this.pagerService.getPager(this.length, page);
        this.onPageChanged.emit({startIndex: this.pager.startIndex, endIndex: this.pager.endIndex, totalPages: this.pager.totalPages});
        localStorage.setItem('searchPage', JSON.stringify(page));
    }

}
