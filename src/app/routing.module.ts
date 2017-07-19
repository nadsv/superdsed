import { AuthGuard } from './auth/auth-guard.service';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SearchformComponent } from './searchform/searchform.component';
import { DocformComponent } from './docform/docform.component';
import { DocformDetailComponent } from './docform-detail/docform-detail.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { CanDeactivateGuard } from './docform/can-deactivate-guard.service';


const routes: Routes = [
    {path: 'search', component: SearchformComponent},
    {path: 'doc/:id', component: DocformComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard]},
    {path: 'doc-detail/:id', component: DocformDetailComponent},
    {path: 'catalogs', loadChildren: './catalogs/catalogs.module#CatalogsModule', canActivate: [AuthGuard]},
    {path: '', redirectTo: 'search', pathMatch : 'full'},
    { path: '**', component: PageNotFoundComponent }
];

export const RoutingModule = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
