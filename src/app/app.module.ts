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
import { DocFormModule } from './docform/docform.module';
import { SearchFormModule } from './searchform/searchform.module'; 
import { SharedModule } from './shared/shared.module'; 
import { CoreModule } from './core/core.module';
import { DocformDetailComponent } from './docform-detail/docform-detail.component'; 


@NgModule({
    declarations: [
        AppComponent,
        DialogComponent,
        PageNotFoundComponent,
        DocformDetailComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule, 
        MaterialModule.forRoot(),
        BrowserAnimationsModule,
        HttpModule,
        RoutingModule,
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