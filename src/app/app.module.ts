import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routing';

import { SedApiService } from './shared/sed-api.service';
import { DialogsService } from './shared/dialog.service';
import { PagerService } from './shared/pagination.service';

import { AppComponent } from './app.component';
import { DialogComponent } from './dialog/dialog.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { DocFormModule } from './docform/docform.module';
import { SearchFormModule } from './searchform/searchform.module'; 
import { SharedModule } from './shared/shared.module'; 
import { CoreModule } from './core/core.module'; 

@NgModule({
    declarations: [
        AppComponent,
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
        SearchFormModule,
        SharedModule,
        CoreModule
    ],
    providers: [],
    entryComponents: [
        DialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }