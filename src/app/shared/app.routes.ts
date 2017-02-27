import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchformComponent } from '../searchform/searchform.component';
import { DocformComponent } from '../docform/docform.component';
import { PageNotFoundComponent } from '../pagenotfound/pagenotfound.component';

const routes: Routes = [
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent},
    {path: 'doc', redirectTo: 'doc/0', pathMatch : 'full'},
    {path: '', redirectTo: 'search', pathMatch : 'full'},
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(routes);
