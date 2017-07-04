import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogsComponent } from './catalogs.component';
import { GarbagecollectorComponent } from './garbagecollector/garbagecollector.component';
import { GroupcatalogComponent } from './groupcatalog/groupcatalog.component';
import { SectioncatalogComponent } from './sectioncatalog/sectioncatalog.component';


const catalogsRoutes = [
	{path: 'catalogs', component: CatalogsComponent},
    {path: 'catalogs/sections', component: SectioncatalogComponent},
    {path: 'catalogs/groups', component: GroupcatalogComponent},
    {path: 'catalogs/garbagecollector', component: GarbagecollectorComponent}
    ];


@NgModule({
	imports: [
		RouterModule.forChild(catalogsRoutes)
	],
	exports: [
		RouterModule
	]
})
export class CatalogsRoutingModule {}