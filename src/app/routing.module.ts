import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SearchformComponent } from './searchform/searchform.component';
import { DocformComponent } from './docform/docform.component';
import { DocformDetailComponent } from './docform-detail/docform-detail.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent},
    {path: 'doc-detail/:id', component: DocformDetailComponent},
    {path: 'catalogs', loadChildren: './catalogs/catalogs.module#CatalogsModule'},
    {path: '', redirectTo: 'search', pathMatch : 'full'},
    { path: '**', component: PageNotFoundComponent }
];

export const RoutingModule = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
