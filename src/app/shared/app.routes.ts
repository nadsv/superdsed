import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchformComponent } from '../searchform/searchform.component';
import { DocformComponent } from '../docform/docform.component';
import { CatalogsComponent } from '../catalogs/catalogs.component';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';

const routes: Routes = [
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent},
    {path: 'catalogs', component: CatalogsComponent},
    {path: '', redirectTo: 'search', pathMatch : 'full'},
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(routes);
