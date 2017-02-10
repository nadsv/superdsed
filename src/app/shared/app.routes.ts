import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchformComponent } from '../searchform/searchform.component';
import { DocformComponent } from '../docform/docform.component';

const routes: Routes = [
    {path: '', redirectTo: 'index', pathMatch : 'full'},
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent},
    {path: 'doc', redirectTo: 'doc/0', pathMatch : 'full'},
];

export const routing = RouterModule.forRoot(routes);
