import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './shared/app.routes';

import { SedApiService } from './shared/sed-api.service';
import { DialogsService } from './shared/dialog.service';
import { PagerService } from './shared/pagination.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { DialogComponent } from './dialog/dialog.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { DocFormModule } from './docform/docform.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { SearchFormModule } from './searchform/searchform.module'; 
import { SharedModule } from './shared/shared.module'; 


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        DialogComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule, 
        MaterialModule.forRoot(),
        BrowserAnimationsModule,
        HttpModule,
        routing,
        DocFormModule,
        CatalogsModule,
        SearchFormModule,
        SharedModule
    ],
    providers: [
        SedApiService, 
        DialogsService,
        PagerService
    ],
    entryComponents: [
        DialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }