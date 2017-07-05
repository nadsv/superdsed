import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogsComponent } from './catalogs.component';
import { GarbagecollectorComponent } from './garbagecollector/garbagecollector.component';
import { GroupcatalogComponent } from './groupcatalog/groupcatalog.component';
import { SectioncatalogComponent } from './sectioncatalog/sectioncatalog.component';


const catalogsRoutes = [
	{path: '', component: CatalogsComponent},
    {path: 'sections', component: SectioncatalogComponent},
    {path: 'groups', component: GroupcatalogComponent},
    {path: 'garbagecollector', component: GarbagecollectorComponent}
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