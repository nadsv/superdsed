import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { CatalogsModule } from './catalogs/catalogs.module'; 
import { DocFormModule } from './docform/docform.module';
import { SearchFormModule } from './searchform/searchform.module'; 
import { SharedModule } from './shared/shared.module'; 
import { CoreModule } from './core/core.module';
import { DocformDetailComponent } from './docform-detail/docform-detail.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { CanDeactivateGuard } from './docform/can-deactivate-guard.service';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { GarbagecollectorComponent } from './catalogs/garbagecollector/garbagecollector.component';
import { SectioncatalogComponent } from './catalogs/sectioncatalog/sectioncatalog.component';

@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        PageNotFoundComponent,
        DocformDetailComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule.forRoot(),
        BrowserAnimationsModule,
        HttpModule,
        RoutingModule,
        CatalogsModule,
        DocFormModule,
        SearchFormModule,
        SharedModule,
        CoreModule
    ],
    providers: [AuthGuard, CanDeactivateGuard],
    entryComponents: [
        DialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }