import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchformComponent } from '../searchform/searchform.component';
import { DocformComponent } from '../docform/docform.component';
import { CatalogsComponent } from '../catalogs/catalogs.component';
import { SectioncatalogComponent } from '../catalogs/sectioncatalog/sectioncatalog.component';
import { GroupcatalogComponent } from '../catalogs/groupcatalog/groupcatalog.component';
import { GarbagecollectorComponent } from '../catalogs/garbagecollector/garbagecollector.component';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';

const routes: Routes = [
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent},
    {path: '', redirectTo: 'search', pathMatch : 'full'},
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(routes);
