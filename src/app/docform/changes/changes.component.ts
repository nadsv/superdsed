import { Component, OnInit, OnDestroy } from '@angular/core';
import { SedApiService } from '../../shared/sed-api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.scss']
})
export class ChangesComponent implements OnInit {
	changes: any[];
	private docSubsription: Subscription;

	constructor(private sedAPI: SedApiService,
		        private router: Router) { }

	ngOnInit() {
		this.changes = this.sedAPI.changes;
		this.docSubsription = this.sedAPI.docChanged
  		.subscribe( 
  			( id ) => { this.changes = this.sedAPI.changes }
  		);
	}

	ngOnDestroy() {
		this.docSubsription.unsubscribe();
	}

	onClick(id) {
		this.router.navigate([`doc/${id}`]);
	}

}
