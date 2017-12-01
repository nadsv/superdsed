import { AuthGuard } from './auth/auth-guard.service';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchformComponent } from './searchform/searchform.component';
import { DocformComponent } from './docform/docform.component';
import { DocformDetailComponent } from './docform-detail/docform-detail.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { CanDeactivateGuard } from './docform/can-deactivate-guard.service';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { GarbagecollectorComponent } from './catalogs/garbagecollector/garbagecollector.component';
import { SectioncatalogComponent } from './catalogs/sectioncatalog/sectioncatalog.component';

const routes: Routes = [
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
    {path: 'doc-detail/:id', component: DocformDetailComponent},
    {path: 'catalogs', component: CatalogsComponent},
    {path: 'catalogs/sections', component: SectioncatalogComponent},
    {path: 'catalogs/garbagecollector', component: GarbagecollectorComponent},
    {path: '', component: SearchformComponent, pathMatch : 'full'},
    {path: '**', component: PageNotFoundComponent }
];

export const RoutingModule = RouterModule.forRoot(routes);
