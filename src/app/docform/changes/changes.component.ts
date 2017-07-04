import { Component, OnInit } from '@angular/core';
import { SedApiService } from '../../shared/sed-api.service';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.scss']
})
export class ChangesComponent implements OnInit {
	changes: any[];

	constructor(private sedAPI: SedApiService) { }

	ngOnInit() {
		this.changes = this.sedAPI.changes;
	}

}
