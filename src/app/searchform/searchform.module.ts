import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { SearchformComponent } from './searchform.component';
import { SearchresultsComponent } from './searchresults/searchresults.component';
import { PaginationComponent } from './searchresults/pagination/pagination.component';

@NgModule ({
	declarations: [
		SearchformComponent,
		SearchresultsComponent,
		PaginationComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule
	]
	})
export class SearchFormModule {}