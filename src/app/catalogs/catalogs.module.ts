import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogsComponent } from './catalogs.component';
import { GarbagecollectorComponent } from './garbagecollector/garbagecollector.component';
import { SectioncatalogComponent } from './sectioncatalog/sectioncatalog.component';
import { CatalogsRoutingModule } from './catalogs-routing.module';

@NgModule ({
	declarations: [
		CatalogsComponent,
		GarbagecollectorComponent,
		SectioncatalogComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		CatalogsRoutingModule
	]
})
export class CatalogsModule {

}